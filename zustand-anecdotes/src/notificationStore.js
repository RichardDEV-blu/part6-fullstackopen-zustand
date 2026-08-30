import { create } from 'zustand'

const useNotificationStore = create((set) => ({
    notification: null,
    actions: {
        showNotification: notification => {
            set({ notification: notification })

            setTimeout(() => {
                set({ notification: null })
            }, 5000)
        }
    }
}))

export const useNotification = () => useNotificationStore((state) => state.notification)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)

export default useNotificationStore