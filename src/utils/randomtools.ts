export const getRandomElement = (list: string[]) => {
    const randomIndex = Math.floor(Math.random() * list.length);
    return list[randomIndex];
};