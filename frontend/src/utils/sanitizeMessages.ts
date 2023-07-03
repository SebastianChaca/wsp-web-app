import { serverMessageResponse, messageUI } from '../types/message/message';
import { formatDateMessage } from './date';

export const sanitizeMessages = (messages: serverMessageResponse[]) =>
  messages
    .map((msg) => ({
      to: msg.to,
      from: msg.from,
      message: msg.message,
      date: msg.createdAt,
      seen: msg.seen,
      id: msg._id,
      parseDate: formatDateMessage(msg.createdAt),
    }))
    .reverse();
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
