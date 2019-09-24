export const calculateReadingTime = (text) => {
    return Math.ceil(text.split(' ').length/200);
}

export const getIdFromCustomURL = (url) => {
    console.log(url.indexOf("article"));
    return url.slice(url.indexOf("article")+8);
}