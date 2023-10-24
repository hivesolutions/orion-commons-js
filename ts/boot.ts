import util from "hive-js-util";
import { config as configEnv } from "dotenv";

const { Logging } = util;

const destroy = async () => {
    Logging.debug("Running destroy...");
};

export const setupSignals = async () => {
    process.on("SIGINT", () => {
        process.exit();
    });

    process.on("SIGTERM", () => {
        process.exit();
    });

    process.on("exit", async () => {
        Logging.info("Exiting on user's request");
        await destroy();
    });
};

export const setupEnv = async () => {
    configEnv();
};
