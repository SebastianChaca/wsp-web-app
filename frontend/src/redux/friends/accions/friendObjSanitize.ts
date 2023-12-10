import { friend, friendFromApi } from '../../../types/friend/friend';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export const friendObjSanitize = (payload: friendFromApi): friend => {
  return {
    id: payload.id,
    user: {
      email: payload.user.email,
      name: capitalizeFirstLetter(payload.user.name),
      uid: payload.user.id,
      online: payload.user.online,
      lastActive: payload.user.lastActive,
      id: payload.user.id,
    },
    notifications: payload.notifications,
    status: payload.status,
    isRequesting: payload.isRequesting,
    uid: payload.id,
    lastMessage: {
      to: payload.lastMessage?.to,
      from: payload.lastMessage?.from,
      message: payload.lastMessage?.message,
      seen: payload.lastMessage?.seen,
      date: payload.lastMessage?.createdAt,
      id: payload.lastMessage?._id,
    },
    isTyping: false,
    statusIsApproved: payload.isAccepted,
    statusIsBlocked: payload.isBlocked,
    statusIsPending: payload.isPending,
  };
};
