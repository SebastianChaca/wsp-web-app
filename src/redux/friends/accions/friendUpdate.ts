import { friend } from '../../../types/friend/friend';

export const friendUpdate = (friends: friend[], f: friend) => {
  const {
    isRequesting,
    status,
    user,
    notifications,
    statusIsApproved,
    statusIsPending,
    statusIsBlocked,
  } = f;

  return friends.map((friendItem) => {
    if (friendItem.user.id === user.id) {
      friendItem.isRequesting = isRequesting;
      friendItem.status = status;
      friendItem.statusIsApproved = statusIsApproved;
      friendItem.statusIsPending = statusIsPending;
      friendItem.statusIsBlocked = statusIsBlocked;
      friendItem.notifications = notifications;
      friendItem.user = user;
    }
    return friendItem;
  });
};
