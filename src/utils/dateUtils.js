export const formatDate = (date) => {
  // since the data format would be like this "2025-06-10T12:34:56.789Z" so when Will I try to split it by "T" the first element would be 2025-06-10 
  return date.toISOString().split('T')[0];
};

export const getDaysBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const days = Math.floor((end - start) / (1000 * 60 * 60 * 24));
  return days;
};