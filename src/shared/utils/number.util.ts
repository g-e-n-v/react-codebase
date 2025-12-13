export function formatNumberCompact(num: number) {
  if (Math.abs(num) >= 1e9) return `${(num / 1e9).toFixed(1).replace(/\.0$/, "")}B`;
  if (Math.abs(num) >= 1e6) return `${(num / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(num) >= 1e3) return `${(num / 1e3).toFixed(1).replace(/\.0$/, "")}K`;

  return Math.round(num).toString();
}

export function formatCurrency(num: number, options?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
    ...options,
  }).format(num);
}

export function formatFileSize(size: number | undefined) {
  if (size === 0) return "0 Bytes";
  if (!size) return "--";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(size) / Math.log(k));

  return `${parseFloat((size / k ** i).toFixed(2))} ${sizes[i]}`;
}
