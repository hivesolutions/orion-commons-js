import { access, mkdir } from "fs/promises";

export const upsertDirectory = async (dirPath: string) => {
    try {
        await access(dirPath);
    } catch (error) {
        await mkdir(dirPath, { recursive: true });
    }
};

export const pathExists = async (path: string): Promise<boolean> => {
    try {
        await access(path);
        return true;
    } catch (err) {
        return false;
    }
};
