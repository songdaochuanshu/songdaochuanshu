import "../../types.js";
import { Checker } from "../../Checker.js";
import { FileDiagnosticManager } from "../../FileDiagnosticManager.js";
import { createIgnore } from "../../glob.js";
import { composeCheckerSummary, consoleLog, diagnosticToConsoleLevel, diagnosticToRuntimeError, diagnosticToTerminalLog, filterLogLevel, normalizeStylelintDiagnostic, toClientPayload } from "../../logger.js";
import { translateOptions } from "./options.js";
import { parentPort } from "node:worker_threads";
import path from "node:path";
import { fileURLToPath } from "node:url";
import chokidar from "chokidar";
import stylelint from "stylelint";
//#region src/checkers/stylelint/main.ts
const manager = new FileDiagnosticManager();
let createServeAndBuild;
const __filename = fileURLToPath(import.meta.url);
const createDiagnostic = (pluginConfig) => {
	let overlay = true;
	let terminal = true;
	return {
		config: async ({ enableOverlay, enableTerminal }) => {
			overlay = enableOverlay;
			terminal = enableTerminal;
		},
		async configureServer({ root }) {
			if (!pluginConfig.stylelint) return;
			const translatedOptions = await translateOptions(pluginConfig.stylelint.lintCommand);
			const baseConfig = {
				cwd: root,
				...translatedOptions
			};
			const logLevel = (() => {
				if (typeof pluginConfig.stylelint !== "object") return void 0;
				const userLogLevel = pluginConfig.stylelint.dev?.logLevel;
				if (!userLogLevel) return void 0;
				const map = {
					error: 1,
					warning: 0
				};
				return userLogLevel.map((l) => map[l]);
			})();
			const dispatchDiagnostics = () => {
				const diagnostics = filterLogLevel(manager.getDiagnostics(), logLevel);
				if (terminal) {
					for (const d of diagnostics) consoleLog(diagnosticToTerminalLog(d, "Stylelint"), diagnosticToConsoleLevel(d));
					const errorCount = diagnostics.filter((d) => d.level === 1).length;
					const warningCount = diagnostics.filter((d) => d.level === 0).length;
					consoleLog(composeCheckerSummary("Stylelint", errorCount, warningCount), errorCount ? "error" : warningCount ? "warn" : "info");
				}
				if (overlay) parentPort?.postMessage({
					type: "overlayError",
					payload: toClientPayload("stylelint", diagnostics.map((d) => diagnosticToRuntimeError(d)))
				});
			};
			const handleFileChange = async (filePath, type) => {
				const absPath = path.resolve(root, filePath);
				if (type === "unlink") manager.updateByFileId(absPath, []);
				else if (type === "change") {
					const { results: diagnosticsOfChangedFile } = await stylelint.lint({
						...baseConfig,
						files: filePath
					});
					const newDiagnostics = diagnosticsOfChangedFile.flatMap((d) => normalizeStylelintDiagnostic(d));
					manager.updateByFileId(absPath, newDiagnostics);
				}
				dispatchDiagnostics();
			};
			const { results: diagnostics } = await stylelint.lint({
				...baseConfig,
				...pluginConfig.stylelint.dev?.overrideConfig
			});
			manager.initWith(diagnostics.flatMap((p) => normalizeStylelintDiagnostic(p)));
			dispatchDiagnostics();
			let watchTarget = root;
			if (pluginConfig.stylelint.watchPath) if (Array.isArray(pluginConfig.stylelint.watchPath)) watchTarget = pluginConfig.stylelint.watchPath.map((p) => path.resolve(root, p));
			else watchTarget = path.resolve(root, pluginConfig.stylelint.watchPath);
			const watcher = chokidar.watch(watchTarget, {
				cwd: root,
				ignored: createIgnore(root, translatedOptions.files)
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
var StylelintChecker = class extends Checker {
	constructor() {
		super({
			name: "stylelint",
			absFilePath: __filename,
			build: { buildBin: (pluginConfig) => {
				if (pluginConfig.stylelint) {
					const { lintCommand } = pluginConfig.stylelint;
					return ["stylelint", lintCommand.split(" ").slice(1)];
				}
				return ["stylelint", [""]];
			} },
			createDiagnostic
		});
	}
	init() {
		createServeAndBuild = super.initMainThread();
		super.initWorkerThread();
	}
};
const stylelintChecker = new StylelintChecker();
stylelintChecker.prepare();
stylelintChecker.init();
//#endregion
export { StylelintChecker, createServeAndBuild };

//# sourceMappingURL=main.js.map