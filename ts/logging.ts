import { confP } from "yonius";
import util, { LoggingContext } from "hive-js-util";

const { Logging } = util;

export const setupLogging = async (ctx?: LoggingContext) => {
    const level = ((await confP("LEVEL", "DEBUG")) as string).toUpperCase();
    const logstashUrl = (await confP(
        "LOGSTASH_BASE_URL",
        await confP("LOGSTASH_URL", null)
    )) as string | null;

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

    if (logstashUrl && Logging.LogstashHandler.isReady(logstashUrl)) {
        logger.addHandler(new Logging.LogstashHandler(logstashUrl, ctx));
    }
};
