import { dirname } from "path";
import { fileURLToPath } from "url";

export const DB_NAME: string = "IQorbit_db";
export const __DIRNAME: string = fileURLToPath(import.meta.url);
export const __FILENAME: string = dirname(__DIRNAME);
