import { serverMessageResponse, messageUI } from '../types/message/message';
import { capitalizeFirstLetter } from './capitalizeFirstLetter';
import { formatDateMessage } from './date';
// TODO: mover a slice de chat

export const sanitizeMessage = (message: serverMessageResponse) => {
  const messageObj: messageUI = {
    message: message.message,
    to: message.to.id,
    from: message.from.id,
    date: message.createdAt,
    seen: message.seen,
    id: message.id,
    parseDate: capitalizeFirstLetter(formatDateMessage(message.createdAt)),
    nameTo: capitalizeFirstLetter(message.to.name),
    responseTo: message.responseTo
      ? {
          id: message.responseTo.id ?? '',
          from: message.from.id,
          to: message.to.id,
          nameTo: message.to.name,
          emailTo: message.to.email,
          message: message.responseTo.message,
          date: message.responseTo.createdAt,
          image: message.responseTo.image?.secureUrl,
        }
      : undefined,
    iconReactions: message.iconReactions?.map((reaction) => ({
      icon: reaction.icon,
      user: reaction.user,
      id: reaction.id,
      createdAt: reaction.createdAt,
    })),
    image: message.image?.secureUrl,
    hasImage: message.hasImage,
  };
  return messageObj;
};
export const sanitizeMessages = (messages: serverMessageResponse[]) => {
  return messages
    .map((msg) => {
      return sanitizeMessage(msg);
    })
    .reverse();
};
