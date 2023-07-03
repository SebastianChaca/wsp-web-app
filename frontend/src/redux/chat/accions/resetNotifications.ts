import { friend } from '../../../types/friend/friend';

export const resetNotification = (friends: friend[], uid: string) => {
  return friends.map((f) => {
    if (uid === f.user.uid) {
      f.notifications = 0;
    }
    return f;
  });
};
