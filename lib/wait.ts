export const wait = async <T>(ms: number, data?: T): Promise<T | undefined> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), ms);
    });
}
