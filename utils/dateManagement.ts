import {format, differenceInDays, ISOFormatOptions} from 'date-fns'

export const formatDate = (isoDate: any) => {
    if(!isoDate) return 
    return format(new Date(isoDate), 'd MMM yy')
}

export const dayDifference = (startDate: any, endDate: any) => {
  if (!startDate || !endDate) return 1;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 1;
  const diffTime = Math.abs(end.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

export const formatDateForQuery = (date?: Date) =>
  date ? date.toISOString().split("T")[0] : "";