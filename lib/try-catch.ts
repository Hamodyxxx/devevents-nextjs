type Success<T> = {
    data: T,
    error: null
}

type Failure<E> = {
    data: null,
    error: E
}

type Result<T, E = Error> = Success<T> | Failure<E>;


export function tryCatch<T, E = Error>(handler: (() => T), errorsToCatch?: ErrorConstructor[]): Result<T, E>;
export function tryCatch<T, E = Error>(handler: Promise<T>, errorsToCatch?: ErrorConstructor[]): Promise<Result<T, E>>;
export function tryCatch<T, E = Error>(
    handler: Promise<T> | (() => T),
    errorsToCatch?: ErrorConstructor[]
): Promise<Result<T, E>> | Result<T, E>  {
    if(typeof handler === "function") return tryCatchSync(handler, errorsToCatch);
    return tryCatchAsync(handler, errorsToCatch);
}

export const tryCatchAsync = async <T, E = Error>(
    promise: Promise<T>,
    errorsToCatch?: ErrorConstructor[]
): Promise<Result<T, E>> => {
    try {
        const data = await promise;
        return {
            data,
            error: null
        };
    } catch (error) {
        if(errorsToCatch === undefined) return {
            data: null,
            error: error as E
        }

        if(errorsToCatch.some((e) => error instanceof (e as any))) return {
            data: null,
            error: error as E
        }

        throw error;
    }
}

export const tryCatchSync = <T, E = Error>(
    callback: () => T,
    errorsToCatch?: ErrorConstructor[]
): Result<T, E> => {
    try {
        const data = callback();
        return {
            data,
            error: null
        };
    } catch (error) {
        if(errorsToCatch === undefined) return {
            data: null,
            error: error as E
        }

        if(errorsToCatch.some((e) => error instanceof (e as any))) return {
            data: null,
            error: error as E
        }

        throw error;
    }
}
