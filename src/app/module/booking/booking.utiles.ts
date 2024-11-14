import moment from 'moment'

export function calculatePayableAmount (startTime: string, endTime: string, hourlyRate: number){
    const start = moment(startTime, "HH:mm")
    const end= moment(endTime, 'HH:mm')

    const hours = end.diff(start, 'hours', true)

    const payableAmount = hours * hourlyRate
    return payableAmount
}