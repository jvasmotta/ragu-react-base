import moment from "moment";

export function formatDateToString(date: Date | null): string {
  return date
    ? moment(date).format('DD/MM/YYYY HH:mm')
    : '';
}

export function isISODateString(value: unknown): boolean {
  if (typeof value === "string") {
    const date = new Date(value);
    return !isNaN(date.getTime());
  }
  return false;
}

export function getDayIntervalDates(): [Date, Date] {
  const datefinalDay = new Date();
  datefinalDay.setHours(20, 59, 59, 999);
  const dateStartDay = new Date();
  dateStartDay.setHours(0, 0, 0, 999);

  return [dateStartDay, datefinalDay];
}

export function formatMonthAndYear(data : Date) {
  const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const formattedDate = new Date(data);
  const month = months[formattedDate.getUTCMonth()];
  const year = formattedDate.getUTCFullYear();
  return `${month} de ${year}`;
}

export function addDays(date: Date, days: number): Date { 
  const result = new Date(date); result.setDate(result.getDate() + days); 
  return result
}