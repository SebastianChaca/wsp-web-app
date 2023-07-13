import { friend } from '../../../types/friend/friend';
import { messageUI } from '../../../types/message/message';

export const updateLastMessageSeen = (
  friends: friend[],
  message: messageUI
) => {
  return friends.map((f) => {
    if (f.user.uid === message.from || f.user.uid === message.to) {
      f.lastMessage.seen = message.seen;
    }
    return f;
  });
};
