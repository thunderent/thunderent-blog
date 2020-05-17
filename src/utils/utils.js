export const calculateReadingTime = (text) => {
    return Math.ceil(text.split(' ').length/200);
};

export const getIdFromCustomURL = (url) => {
    let baseIndex = url.indexOf("article");
    baseIndex+=8;

    //Remove the fbclidID id when opening a link shared from facebook
    const questionSeparatorIndex = url.indexOf("?");
    return questionSeparatorIndex !== -1 ? url.slice(baseIndex, questionSeparatorIndex) : url.slice(baseIndex);
};

export const getCurrentDateTime = () => {
    let today = new Date();
    let date = today.toDateString();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;

    return dateTime;
};

export const serializeArticleForShare = (params) => {
    return Object.keys(params)
    .map(param => `${param}=${encodeURIComponent(params[param].trim())}`)
    .join("&");   
};