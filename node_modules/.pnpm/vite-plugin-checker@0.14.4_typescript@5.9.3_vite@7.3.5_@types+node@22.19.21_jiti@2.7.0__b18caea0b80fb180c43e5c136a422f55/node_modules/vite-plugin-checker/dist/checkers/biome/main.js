import "../../types.js";
import { Checker } from "../../Checker.js";
import { FileDiagnosticManager } from "../../FileDiagnosticManager.js";
import { composeCheckerSummary, consoleLog, diagnosticToConsoleLevel, diagnosticToRuntimeError, diagnosticToTerminalLog, filterLogLevel, toClientPayload } from "../../logger.js";
import { getBiomeCommand, runBiome, severityMap } from "./cli.js";
import { parentPort } from "node:worker_threads";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chokidar from "chokidar";
//#region src/checkers/biome/main.ts
const __filename = fileURLToPath(import.meta.url);
const manager = new FileDiagnosticManager();
let createServeAndBuild;
const createDiagnostic = (pluginConfig) => {
	const biomeConfig = pluginConfig.biome;
	let overlay = true;
	let terminal = true;
	let command = "lint";
	let flags = "";
	if (typeof biomeConfig === "object") {
		command = biomeConfig?.dev?.command || biomeConfig?.command || "lint";
		flags = biomeConfig?.dev?.flags || biomeConfig?.flags || "";
	}
	return {
		config: async ({ enableOverlay, enableTerminal }) => {
			overlay = enableOverlay;
			terminal = enableTerminal;
		},
		async configureServer({ root }) {
			if (!biomeConfig) return;
			const logLevel = (() => {
				if (typeof biomeConfig !== "object") return void 0;
				const userLogLevel = biomeConfig.dev?.logLevel;
				if (!userLogLevel) return void 0;
				return userLogLevel.map((l) => severityMap[l]);
			})();
			const dispatchDiagnostics = () => {
				const diagnostics = filterLogLevel(manager.getDiagnostics(), logLevel);
				if (terminal) {
					for (const d of diagnostics) consoleLog(diagnosticToTerminalLog(d, "Biome"), diagnosticToConsoleLevel(d));
					const errorCount = diagnostics.filter((d) => d.level === 1).length;
					const warningCount = diagnostics.filter((d) => d.level === 0).length;
					consoleLog(composeCheckerSummary("Biome", errorCount, warningCount), errorCount ? "error" : warningCount ? "warn" : "info");
				}
				if (overlay) parentPort?.postMessage({
					type: "overlayError",
					payload: toClientPayload("biome", diagnostics.map((d) => diagnosticToRuntimeError(d)))
				});
			};
			const handleFileChange = async (filePath, type) => {
				const absPath = path.resolve(root, filePath);
				if (type === "unlink") manager.updateByFileId(absPath, []);
				else if (type === "change") if (path.basename(absPath) === "biome.json") {
					const diagnostics = await runBiome(getBiomeCommand(command, flags, root), root);
					manager.initWith(diagnostics);
				} else {
					const diagnosticsOfChangedFile = await runBiome(getBiomeCommand(command, flags, absPath), root);
					manager.updateByFileId(absPath, diagnosticsOfChangedFile);
				}
				dispatchDiagnostics();
			};
			const diagnostics = await runBiome(getBiomeCommand(command, flags, root), root);
			manager.initWith(diagnostics);
			dispatchDiagnostics();
			let watchTarget = root;
			if (typeof biomeConfig === "object" && biomeConfig.watchPath) if (Array.isArray(biomeConfig.watchPath)) watchTarget = biomeConfig.watchPath.map((p) => path.resolve(root, p));
			else watchTarget = path.resolve(root, biomeConfig.watchPath);
			const watcher = chokidar.watch(watchTarget, {
				cwd: root,
				ignored: (path) => path.includes("node_modules")
			});
			watcher.on("change", async (filePath) => {
				handleFileChange(filePath, "change");
			});
			watcher.on("unlink", async (filePath) => {
				handleFileChange(filePath, "unlink");
			});
		}
	};
};
var BiomeChecker = class extends Checker {
	constructor() {
		super({
			name: "biome",
			absFilePath: __filename,
			build: { buildBin: (pluginConfig) => {
				if (typeof pluginConfig.biome === "object") {
					const { command, flags } = pluginConfig.biome;
					return ["biome", [command || "check", flags || ""]];
				}
				return ["biome", ["check"]];
			} },
			createDiagnostic
		});
	}
	init() {
		createServeAndBuild = super.initMainThread();
		super.initWorkerThread();
	}
};
const biomeChecker = new BiomeChecker();
biomeChecker.prepare();
biomeChecker.init();
//#endregion
export { BiomeChecker, createServeAndBuild };

//# sourceMappingURL=main.js.map