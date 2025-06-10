export const formatDate = (date) => {
  return date.toISOString().split('T')[0];
};

export const getDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  return days;
};