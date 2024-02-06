import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';
import { FRIEND } from './const';

export const getFriendById = async (friendId: string) => {
  const response = await makePrivateRequest<friendFromApi>(
    `${FRIEND}/${friendId}`,
    {
      method: 'get',
    }
  );
  return response;
};
