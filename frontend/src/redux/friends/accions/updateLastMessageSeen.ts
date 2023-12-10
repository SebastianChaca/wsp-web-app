import { friend } from '../../../types/friend/friend';
import { messageUI } from '../../../types/message/message';

export const updateLastMessageSeen = (
  friends: friend[],
  message: messageUI
) => {
  return friends.map((f) => {
    if (f.user.id === message.from || f.user.id === message.to) {
      f.lastMessage.seen = message.seen;
    }
    return f;
  });
};
