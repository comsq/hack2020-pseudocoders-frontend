export const AsyncHelper = {
    delay(time: number) {
        return new Promise((resolve) => {
            setTimeout(resolve, time);
        });
    },
};
