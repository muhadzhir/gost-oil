import {ElNotification} from 'element-plus'
import { Notification} from "@/types.ts";
const notifications: Notification[] = []

export const showNotification = (message: string, title?:string) => {
    ElNotification({
        title,
        message,
        type: 'info',
        onClose() {
            notifications.shift()
        },
        position: 'bottom-right'
    } as Notification)
}
