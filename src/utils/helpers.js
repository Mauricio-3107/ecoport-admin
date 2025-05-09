import {
  differenceInDays,
  formatDistance,
  parseISO,
  add,
  addMonths,
  isAfter,
  isSameDay,
} from "date-fns";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it is not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("es-BO", {
    style: "currency",
    currency: "BOB",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

export function fromToday(numDays, withTime = false) {
  const date = add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

export function getStatusDate(expirationDate) {
  const today = new Date();
  const expDate = parseISO(expirationDate);
  const oneMonthBefore = addMonths(expDate, -1);
  if (
    isAfter(today, oneMonthBefore) ||
    isSameDay(expDate, today) ||
    isAfter(today, expDate)
  ) {
    return "strong-red";
  } else {
    return "green";
  }
}

export function formatRate(rate) {
  return (
    new Intl.NumberFormat("es-BO", {
      style: "currency",
      currency: "BOB",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(rate) + "/km"
  );
}

export function formatMileage(km) {
  return `${new Intl.NumberFormat("es-BO", { maximumFractionDigits: 2 }).format(
    km
  )} km`;
}

export function formatRuntime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  if (hours === 0) return `${minutes} min`; // Show only minutes if < 1 hour
  return `${hours}h ${minutes}m`; // Show hours and minutes normally
}

export function formatDateBolivia(dateStr) {
  if (!dateStr) return "";

  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr;

  return date.toLocaleDateString("es-BO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function formatKm(km) {
  if (typeof km !== "number") return "—";
  return new Intl.NumberFormat("es-BO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(km);
}
