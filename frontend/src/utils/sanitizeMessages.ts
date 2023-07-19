import { serverMessageResponse, messageUI } from '../types/message/message';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
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
        parseDate: capitalizeFirstLetter(formatDateMessage(msg.createdAt)),
        nameTo: capitalizeFirstLetter(msg.to.name),
        emailTo: msg.to.email ?? '',
        responseTo: msg.responseTo
          ? {
              id: msg.responseTo._id ?? '',
              from: msg.from._id,
              to: msg.to._id,
              nameTo: msg.to.name,
              emailTo: msg.to.email,
              message: msg.responseTo.message,
              date: msg.responseTo.createdAt,
            }
          : undefined,
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
    parseDate: capitalizeFirstLetter(formatDateMessage(message.createdAt)),
    nameTo: capitalizeFirstLetter(message.to.name),
    responseTo: message.responseTo
      ? {
          id: message.responseTo._id ?? '',
          from: message.from._id,
          to: message.to._id,
          nameTo: message.to.name,
          emailTo: message.to.email,
          message: message.responseTo.message,
          date: message.responseTo.createdAt,
        }
      : undefined,
  };
  return messageObj;
};
