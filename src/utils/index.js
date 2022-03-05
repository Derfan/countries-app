const createFormatter = (options) => (value) => new Intl.NumberFormat(options).format(value);

export const formatNumber = createFormatter();
