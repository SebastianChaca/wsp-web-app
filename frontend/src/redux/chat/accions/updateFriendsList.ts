import { friend, friendsAPIResponse } from '../../../types/friend/friend';
import { friendObjSanitize } from './friendObjSanitize';

export const updateFriendList = (payload: friendsAPIResponse) => {
  return payload.friends.map((data) => friendObjSanitize(data));
};
