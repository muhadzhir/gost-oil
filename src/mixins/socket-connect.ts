import { io } from 'socket.io-client'
const socket = io('https://muhadzhir-gost-oil-server-4054.twc1.net');
export const useSocket = () => {
  return {
    socket
  }
}
