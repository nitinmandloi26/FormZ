export const formatDate = (date, includeWeekday = false, includeYear = true) => {
  return date.toLocaleDateString("en-US", {
    weekday: includeWeekday ? "long" : undefined,
    year: includeYear ? "numeric" : undefined,
    month: "long",
    day: "numeric",
  });
};

export const formatDate2 = (date) => {
  if (!date) return "";
  
  const d = date instanceof Date ? date : new Date(date);

  // Check for invalid date
  if (isNaN(d.getTime())) {
    console.error("Invalid date passed to formatDate2:", date);
    return "";
  }

  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = d.getFullYear();

  return `${month}/${day}/${year}`;
};

