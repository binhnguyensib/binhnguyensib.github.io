export const convertNumToCurrency = (num?: number) => {
    if (typeof num !== 'number') return '';

    const formatted = num.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    });

    return formatted.replace(/\s?₫$/, ''); // removes ' ₫' or '₫' at the end
};
