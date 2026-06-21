import type { Checksum } from "@smithy/types";
/**
 * Implements CRC-64/NVME checksum algorithm.
 *
 * This class provides CRC-64 checksum calculation using the NVMe polynomial (0x9a6c9329ac4bc9b5).
 * It uses an 8-slice lookup table for efficient computation.
 *
 * @example
 * ```typescript
 * const checksum = new Crc64Nvme();
 * checksum.update(new Uint8Array([1, 2, 3]));
 * const result = await checksum.digest();
 * ```
 *
 * @public
 */
export declare class Crc64Nvme implements Checksum {
    private c1;
    private c2;
    constructor();
    update(data: Uint8Array): void;
    digest(): Promise<Uint8Array>;
    reset(): void;
}
