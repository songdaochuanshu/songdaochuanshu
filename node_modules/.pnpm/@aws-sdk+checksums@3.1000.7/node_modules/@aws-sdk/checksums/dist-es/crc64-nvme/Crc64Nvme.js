const generateCRC64NVMETable = () => {
    const sliceLength = 8;
    const tables = new Array(sliceLength);
    for (let slice = 0; slice < sliceLength; slice++) {
        const table = new Array(512);
        for (let i = 0; i < 256; i++) {
            let crc = BigInt(i);
            for (let j = 0; j < 8 * (slice + 1); j++) {
                if (crc & 1n) {
                    crc = (crc >> 1n) ^ 0x9a6c9329ac4bc9b5n;
                }
                else {
                    crc = crc >> 1n;
                }
            }
            table[i * 2] = Number((crc >> 32n) & 0xffffffffn);
            table[i * 2 + 1] = Number(crc & 0xffffffffn);
        }
        tables[slice] = new Uint32Array(table);
    }
    return tables;
};
let CRC64_NVME_REVERSED_TABLE;
let t0, t1, t2, t3;
let t4, t5, t6, t7;
const ensureTablesInitialized = () => {
    if (!CRC64_NVME_REVERSED_TABLE) {
        CRC64_NVME_REVERSED_TABLE = generateCRC64NVMETable();
        [t0, t1, t2, t3, t4, t5, t6, t7] = CRC64_NVME_REVERSED_TABLE;
    }
};
export class Crc64Nvme {
    c1 = 0;
    c2 = 0;
    constructor() {
        ensureTablesInitialized();
        this.reset();
    }
    update(data) {
        const len = data.length;
        let i = 0;
        let crc1 = this.c1;
        let crc2 = this.c2;
        while (i + 8 <= len) {
            const idx0 = ((crc2 ^ data[i++]) & 255) << 1;
            const idx1 = (((crc2 >>> 8) ^ data[i++]) & 255) << 1;
            const idx2 = (((crc2 >>> 16) ^ data[i++]) & 255) << 1;
            const idx3 = (((crc2 >>> 24) ^ data[i++]) & 255) << 1;
            const idx4 = ((crc1 ^ data[i++]) & 255) << 1;
            const idx5 = (((crc1 >>> 8) ^ data[i++]) & 255) << 1;
            const idx6 = (((crc1 >>> 16) ^ data[i++]) & 255) << 1;
            const idx7 = (((crc1 >>> 24) ^ data[i++]) & 255) << 1;
            crc1 = t7[idx0] ^ t6[idx1] ^ t5[idx2] ^ t4[idx3] ^ t3[idx4] ^ t2[idx5] ^ t1[idx6] ^ t0[idx7];
            crc2 =
                t7[idx0 + 1] ^
                    t6[idx1 + 1] ^
                    t5[idx2 + 1] ^
                    t4[idx3 + 1] ^
                    t3[idx4 + 1] ^
                    t2[idx5 + 1] ^
                    t1[idx6 + 1] ^
                    t0[idx7 + 1];
        }
        while (i < len) {
            const idx = ((crc2 ^ data[i]) & 255) << 1;
            crc2 = ((crc2 >>> 8) | ((crc1 & 255) << 24)) >>> 0;
            crc1 = (crc1 >>> 8) ^ t0[idx];
            crc2 ^= t0[idx + 1];
            i++;
        }
        this.c1 = crc1;
        this.c2 = crc2;
    }
    async digest() {
        const c1 = this.c1 ^ 4294967295;
        const c2 = this.c2 ^ 4294967295;
        return new Uint8Array([
            c1 >>> 24,
            (c1 >>> 16) & 255,
            (c1 >>> 8) & 255,
            c1 & 255,
            c2 >>> 24,
            (c2 >>> 16) & 255,
            (c2 >>> 8) & 255,
            c2 & 255,
        ]);
    }
    reset() {
        this.c1 = 4294967295;
        this.c2 = 4294967295;
    }
}
