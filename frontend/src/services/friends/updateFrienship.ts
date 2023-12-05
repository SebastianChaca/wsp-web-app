import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';
import { FRIEND } from './const';

export const updateFriendship = async (friendId: { friendId: string }) => {
  const response = await makePrivateRequest<friendFromApi>(
    `${FRIEND}/addsender`,
    {
      data: friendId,
      method: 'post',
    }
  );
  return response;
};
