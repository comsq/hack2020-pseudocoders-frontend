import { JsonSafe } from './JsonSafe';

export const LocalStorageSafe = {
    getItem<T = unknown>(key: string): T | null {
        try {
            const item = localStorage.getItem(key);
            if (item === null) {
                return item;
            }
            return JsonSafe.parse<T>(item);
        } catch {
            return null;
        }
    },

    setItem<T = unknown>(key: string, item: T) {
        try {
            localStorage.setItem(key, JsonSafe.stringify(item));
        } catch {}
    },
};
