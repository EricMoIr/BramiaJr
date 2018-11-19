exports.getParams = (message) => {
    return message.content.split(" ").filter((param, i) => {
        return i > 0 && param !== "";
    });
};
