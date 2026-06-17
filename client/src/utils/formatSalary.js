export const formatSalary = (amount) => {
  if (amount > 1000) {
    return `${amount / 1000}k`;
  }
  return amount;
};
