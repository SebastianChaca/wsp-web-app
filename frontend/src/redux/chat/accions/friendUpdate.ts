import { friend } from '../../../types/friend/friend';

export const friendUpdate = (friends: friend[], f: friend) => {
  const { isRequesting, status, user, notifications } = f;
  return friends.map((friendItem) => {
    if (f.user.uid === user.uid) {
      friendItem.isRequesting = isRequesting;
      friendItem.status = status;
      friendItem.statusIsApproved = status === 1;
      friendItem.notifications = notifications;
      friendItem.user = user;
    }
    return friendItem;
  });
};
