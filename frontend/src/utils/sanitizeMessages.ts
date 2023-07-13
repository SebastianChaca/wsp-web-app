import { serverMessageResponse, messageUI } from '../types/message/message';
import { formatDateMessage } from './date';

export const sanitizeMessages = (messages: serverMessageResponse[]) => {
  return messages
    .map((msg) => {
      const messageObj: messageUI = {
        to: msg.to,
        from: msg.from,
        message: msg.message,
        date: msg.createdAt,
        seen: msg.seen,
        id: msg._id,
        parseDate: formatDateMessage(msg.createdAt),
      };
      return messageObj;
    })
    .reverse();
};

export const sanitizeMessage = (message: serverMessageResponse) => {
  const messageObj: messageUI = {
    message: message.message,
    to: message.to,
    from: message.from,
    date: message.createdAt,
    seen: message.seen,
    id: message._id,
    parseDate: formatDateMessage(message.createdAt),
  };
  return messageObj;
};
