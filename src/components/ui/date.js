export const formatDate = (date, includeWeekday = false) => {
  return date.toLocaleDateString("en-US", {
    weekday: includeWeekday ? "long" : undefined,
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
