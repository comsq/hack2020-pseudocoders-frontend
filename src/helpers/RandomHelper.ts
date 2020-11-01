export const RandomHelper = {
    getRandomInteger(min = 0, max = 1000000) {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    },
};
