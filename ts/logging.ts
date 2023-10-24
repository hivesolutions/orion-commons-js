import { confP } from "yonius";
import util from "hive-js-util";

const { Logging } = util;

export const setupLogging = async () => {
    const level = ((await confP("LEVEL", "DEBUG")) as string).toUpperCase();

    const logger = Logging.getLogger(undefined, {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        level: (<any>Logging.constants)[level]
    });

    if (Logging.ConsolaHandler.isReady()) {
        logger.addHandler(new Logging.ConsolaHandler());
        logger.setFormatter(new Logging.SimpleFormatter("{asctime} {message}"));
    } else {
        logger.addHandler(new Logging.StreamHandler());
        logger.setFormatter(new Logging.SimpleFormatter());
    }
};
