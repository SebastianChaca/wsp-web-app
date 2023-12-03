import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';

export const getFriendById = async (friendId: string) => {
  const response = await makePrivateRequest<friendFromApi>(
    `friend/${friendId}`,
    {
      method: 'get',
    }
  );
  return response;
};
