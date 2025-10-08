// Formatting utilities

export function formatNumber(num: number, decimals: number = 2): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCurrency(
  num: number,
  currency: string = "USD",
  decimals: number = 2
): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatCompactNumber(num: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
  }).format(num);
}

export function formatPercentage(num: number, decimals: number = 2): string {
  return `${num > 0 ? "+" : ""}${formatNumber(num, decimals)}%`;
}

export function formatAddress(
  address: string,
  startLength: number = 6,
  endLength: number = 4
): string {
  if (address.length <= startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}

export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + " year" + (Math.floor(interval) !== 1 ? "s" : "") + " ago";
  }

  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " month" + (Math.floor(interval) !== 1 ? "s" : "") + " ago";
  }

  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " day" + (Math.floor(interval) !== 1 ? "s" : "") + " ago";
  }

  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " hour" + (Math.floor(interval) !== 1 ? "s" : "") + " ago";
  }

  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minute" + (Math.floor(interval) !== 1 ? "s" : "") + " ago";
  }

  return Math.floor(seconds) + " second" + (Math.floor(seconds) !== 1 ? "s" : "") + " ago";
}

export function formatLargeNumber(num: number): string {
  if (num >= 1e12) {
    return formatNumber(num / 1e12, 2) + "T";
  }
  if (num >= 1e9) {
    return formatNumber(num / 1e9, 2) + "B";
  }
  if (num >= 1e6) {
    return formatNumber(num / 1e6, 2) + "M";
  }
  if (num >= 1e3) {
    return formatNumber(num / 1e3, 2) + "K";
  }
  return formatNumber(num, 2);
}
