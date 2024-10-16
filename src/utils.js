function formatDollarAmount(amount) {
  return '$' + (amount % 1 === 0 ? amount.toFixed(0) : amount.toFixed(2));
}

export {
  formatDollarAmount,
};
