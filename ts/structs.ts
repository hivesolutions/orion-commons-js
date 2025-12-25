export type Error = {
    message: string;
    code: number;
    stack?: string;
};

export type BaseError = {
    message?: string;
    code?: number;
    stack?: string;
};
