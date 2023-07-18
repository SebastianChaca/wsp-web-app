import { serverMessageResponse, messageUI } from '../types/message/message';
import { formatDateMessage } from './date';
// TODO: mover a slice de chat

export const sanitizeMessages = (messages: serverMessageResponse[]) => {
  return messages
    .map((msg) => {
      const messageObj: messageUI = {
        to: msg.to._id,
        from: msg.from._id,
        message: msg.message,
        date: msg.createdAt,
        seen: msg.seen,
        id: msg._id,
        parseDate: formatDateMessage(msg.createdAt),
        nameTo: msg.to.name,
        emailTo: msg.to.email ?? '',
      };
      return messageObj;
    })
    .reverse();
};

export const sanitizeMessage = (message: serverMessageResponse) => {
  const messageObj: messageUI = {
    message: message.message,
    to: message.to._id,
    from: message.from._id,
    date: message.createdAt,
    seen: message.seen,
    id: message._id,
    parseDate: formatDateMessage(message.createdAt),
  };
  return messageObj;
};
