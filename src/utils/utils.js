export const calculateReadingTime = (text) => {
    return Math.ceil(text.split(' ').length/200);
}