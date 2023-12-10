import { friend } from '../../../types/friend/friend';

export const updateNotification = (friends: friend[], uid: string) => {
  return friends.map((f) => {
    if (f.user.uid === uid) {
      f.notifications += 1;
    }
    return f;
  });
};
