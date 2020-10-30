export const JsonSafe = {
    parse<T = unknown>(
        text: string,
        reviver?: (this: T, key: string, value: T) => T,
    ): T | null {
        try {
            return JSON.parse(text, reviver) as T;
        } catch {
            return null;
        }
    },

    stringify<T = unknown>(
        value: T,
        replacer?: (this: T, key: string, value: T) => T,
        space?: string | number,
    ): string {
        try {
            return JSON.stringify(value, replacer, space) || '';
        } catch {
            return '';
        }
    },
};
