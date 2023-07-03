import { friend } from '../../../types/friend/friend';
import { messageUI } from '../../../types/message/message';

export const updateMessageAndNotifications = (
  friends: friend[],
  payload: messageUI
) => {
  return friends.map((f) => {
    if (f.user.uid === payload.from) {
      f.lastMessage = {
        from: payload.from,
        to: payload.to,
        message: payload.message,
        seen: payload.seen,
        date: payload.date,
        id: payload.id,
      };
      f.notifications += 1;
    }
    return f;
  });
};
