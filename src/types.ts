export type FormeRequestStatus = 'SUCCESS' | 'ERROR'
export type FormeRequestData = {
    status: FormeRequestStatus
    name: string
    phone: string
    numbersCount: number
    numbers?: number[]
}
export type NotificationType = 'warning' | 'error' | 'success' | 'info'
export type NotificationPosition = 'top-left' | 'bottom-right' | 'bottom-left' | 'top-right'
export interface NotificationParams {
    message: string
    type?: NotificationType
    title?: string
    position?: NotificationPosition
}
export interface Notification {
    type: NotificationType
    message: string
    position: NotificationPosition
    onClose?: () => void
    title?: string
}
export type OilStation = 'ZARECHNY' | 'GUTYAKULOVA' | 'SHOSEINAYA'

export type FormItemConfig<T> = {
    field: keyof T
    required?: (val: T) => boolean
    validateRule?: Function
    disabled?: (val: T) => boolean
    label?: (val: T) => string
}
export type User = {
    name: string
    password: string
    role: string
    oilStation: OilStation
}
type TableCell= {
    value: string | number
}
export type TableRow = {
    cells: TableCell[]
}
export type Ticket = {
    phone: string
    numbersCount: number
    oilStation: OilStation
}

export type ParticipantNumber = {
    phone: string
    id: number
    createdAt: string
    oilStation: OilStation
}