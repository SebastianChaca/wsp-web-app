import { serverMessageResponse, messageUI } from '../types/message/message';

export const sanitizeMessages = (messages: serverMessageResponse[]) =>
  messages
    .map((msg) => ({
      to: msg.to,
      from: msg.from,
      message: msg.message,
      date: msg.updatedAt,
      seen: msg.seen,
      id: msg._id,
    }))
    .reverse();
export const sanitizeMessage = (message: serverMessageResponse) => {
  const messageObj: messageUI = {
    message: message.message,
    to: message.to,
    from: message.from,
    date: message.updatedAt,
    seen: message.seen,
    id: message._id,
  };
  return messageObj;
};
