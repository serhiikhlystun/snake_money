import { format, isToday, isYesterday ,isWithinInterval, subDays } from "date-fns";

const formatDate = (date) => {
  
  const now = new Date();
  const oneWeekAgo = subDays(now, 6);

  if (isToday(date)) {
    return `Today, ${format(date, "p")}`;
  } else if (isYesterday(date)) {
    return `Yesterday, ${format(date, "p")}`;
  } else if (isWithinInterval(date, { start: oneWeekAgo, end: now })) {
    // Format as "Tuesday, 11:44am"
    return format(date, "EEEE, p");
  } else {
    // Format as "14.08.2024"
    return format(date, "dd.MM.yyyy, p");
  }
};

export default formatDate;
