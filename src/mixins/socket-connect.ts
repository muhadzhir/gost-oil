import { io } from 'socket.io-client'
const socket = io(import.meta.env.VITE_APP_API_MAIN);
export const useSocket = () => {
  return {
    socket
  }
}
