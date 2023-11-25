import { friendFromApi } from '../../../types/friend/friend';
import { friendObjSanitize } from './friendObjSanitize';

export const updateFriendList = (payload: friendFromApi[]) => {
  return payload.map((data) => friendObjSanitize(data));
};
