exports.getParams = (message) => {
    return message.content.split(" ").filter((param, i) => i > 0 && param !== "");
}