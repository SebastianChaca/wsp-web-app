import { friend } from '../../../types/friend/friend';
import { message } from '../../../types/message/message';

export const updateFriendIsTyping = (friends: friend[], payload: message) => {
  return friends.map((f) => {
    if (f.user.uid === payload.from) {
      if (payload.message) {
        f.isTyping = true;
      } else {
        f.isTyping = false;
      }
    }
    return f;
  });
};
