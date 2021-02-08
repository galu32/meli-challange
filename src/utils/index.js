let formatNumber = (value) => {
    value = Number(String(value).replace(/,/g, "."));
    return value.toLocaleString("en")
        .replace(/,/g, ".");
};

export {
    formatNumber
};