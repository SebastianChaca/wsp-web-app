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
        nameTo: msg.to.name,
        emailTo: msg.to.email ?? '',
        responseTo: msg.responseTo
          ? {
              uid: msg.responseTo._id ?? '',
              from: {
                uid: msg.responseTo.from?._id ?? null,
                name: msg?.responseTo.from?.name ?? '',
                email: msg.responseTo.from?.email ?? null,
                online: msg.responseTo.from?.online ?? false,
                lastActive: msg.responseTo.from?.lastActive ?? '',
              },
              to: {
                uid: msg.responseTo.to?._id ?? null,
                name: msg?.responseTo.to?.name ?? '',
                email: msg.responseTo.to?.email ?? null,
                online: msg.responseTo.to?.online ?? false,
                lastActive: msg.responseTo.to?.lastActive ?? '',
              },
              message: msg.message,
              createdAt: msg.createdAt,
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
    responseTo: message.responseTo
      ? {
          uid: message.responseTo?._id ?? '',
          from: {
            uid: message.responseTo?.from._id ?? null,
            name: message?.responseTo?.from.name ?? '',
            email: message.responseTo?.from.email ?? null,
            online: message.responseTo?.from.online ?? false,
            lastActive: message.responseTo?.from.lastActive ?? '',
          },
          to: {
            uid: message.responseTo?.to._id ?? null,
            name: message?.responseTo?.to.name ?? '',
            email: message.responseTo?.to.email ?? null,
            online: message.responseTo?.to.online ?? false,
            lastActive: message.responseTo?.to.lastActive ?? '',
          },
          message: message.message,
          createdAt: message.createdAt,
        }
      : undefined,
  };
  return messageObj;
};
