import dayjs from "dayjs";
import type { StrictDate } from "$/shared/types/date.type";

type DateFormat = "DD/MM/YYYY" | "DD MMM, YYYY";

export function formatDate(date: StrictDate, format: DateFormat = "DD/MM/YYYY") {
  return dayjs(date).format(format);
}
