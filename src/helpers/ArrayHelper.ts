export const ArrayHelper = {
    clearNullable<T>(array: T[]) {
        return array.filter(Boolean) as Exclude<T, false | undefined | null | 0 | ''>[];
    },
};
