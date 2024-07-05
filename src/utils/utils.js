export const formatCurrency = (val) => {
  return (
    "$" + parseFloat(val).toLocaleString("en-US", { minimumFractionDigits: 2 })
  );
};

export const formatDate = (val) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(val).toLocaleDateString(undefined, options);
};

export const formatFrequency = (val) => {
  switch (val) {
    case 'weekly':
      return 'Semanal';
    case 'biweekly':
      return 'Quincenal';
    case 'monthly':
      return 'Mensual';
    default:
      return '-';
  }
};
