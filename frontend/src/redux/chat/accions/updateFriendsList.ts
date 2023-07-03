import { friendsAPIResponse } from '../../../types/friend/friend';

export const updateFriendList = (payload: friendsAPIResponse) => {
  return payload.friends.map((data) => ({
    user: {
      email: data.user.email,
      name: data.user.name,
      uid: data.user.uid,
      online: data.user.online,
      lastActive: data.user.lastActive,
    },
    notifications: data.notifications,
    status: data.status,
    isRequesting: data.isRequesting,
    uid: data._id,
    lastMessage: {
      to: data.lastMessage.to,
      from: data.lastMessage.from,
      message: data.lastMessage.message,
      seen: data.lastMessage.seen,
      date: data.lastMessage.createdAt,
      id: data.lastMessage._id,
    },
    IsTyping: false,
  }));
};
