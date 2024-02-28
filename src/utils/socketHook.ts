import { useEffect } from "react";
import { io } from "socket.io-client"
import { baseUrl } from "../constant";
type RefreshMessagesCallback = () => void;


export function SocketHookPriestMessage(callBack:RefreshMessagesCallback) {
    useEffect(() => {
      const socket = io(`${baseUrl}`);
      socket.on('receive-message', () => {
          callBack();
      });
      return () => {
        socket.disconnect();
      };
    }, []);
}