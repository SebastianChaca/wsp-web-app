import { friend } from '../../../types/friend/friend';
import { messageUI } from '../../../types/message/message';

export const updateLastMessage = (friends: friend[], payload: messageUI) => {
  return friends.map((f) => {
    if (f.user.uid === payload.from || f.user.uid === payload.to) {
      f.lastMessage = {
        from: payload.from,
        to: payload.to,
        message: payload.message,
        seen: payload.seen,
        date: payload.date,
        id: payload.id,
      };
    }
    return f;
  });
};
