export type FormeRequestStatus = 'SUCCESS' | 'ERROR'
export type FormeRequestData = {
    status: FormeRequestStatus
    name: string
    phone: string
    sum: number
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
export type StationEssence = 'ZARECHNYI' | 'GUTYAKULOVA' | 'OBYEZDNAYA'

export type FormItemConfig<T> = {
    field: keyof T
    required?: (val: T) => boolean
    disabled?: (val: T) => boolean
    label?: (val: T) => string
}
