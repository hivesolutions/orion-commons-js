import { FastifyRequest, FastifyReply } from "fastify";
import { Error } from "./structs";

export const errorHandlerFastify = (
    errG: globalThis.Error,
    req: FastifyRequest,
    res: FastifyReply
) => {
    const err = errG as unknown as Error;
    const code =
        err.code && Number(err.code) >= 100 && Number(err.code) < 600
            ? Number(err.code)
            : 500;
    const result: {
        error: string;
        code: number;
        stack?: string[];
    } = { error: err.message, code: code };
    if (process.env.NODE_ENV !== "production") {
        result.stack = err.stack ? err.stack.split("\n") : [];
    }
    res.code(result.code).send(result);
};

export const notFoundHandlerFastify = (
    req: FastifyRequest,
    res: FastifyReply
) => {
    res.code(404).send({ error: "Route not found", code: 404 });
};
