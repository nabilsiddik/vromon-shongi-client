import {format, differenceInDays, ISOFormatOptions} from 'date-fns'

export const formatDate = (isoDate: any) => {
    return format(new Date(isoDate), 'd MMM yy')
}

export const dayDifference = (startDate: any, endDate: any) => {
   return differenceInDays(startDate, endDate)
}