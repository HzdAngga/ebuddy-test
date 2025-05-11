import dayjs, { Dayjs } from "dayjs";

export function formatDate({
  date,
  defaultValue,
  format = "MM/DD/YYYY",
}: {
  date: string | Dayjs | undefined;
  defaultValue?: string;
  format?: string;
}) {
  if (!date) {
    return defaultValue || dayjs().format(format);
  }

  return dayjs(date).format(format);
}
