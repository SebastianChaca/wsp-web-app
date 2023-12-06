import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';
import { FRIEND } from './const';

export const aceptFriend = async (friendId: string) => {
  const response = await makePrivateRequest<friendFromApi>(
    `${FRIEND}/status/${friendId}`,
    {
      data: {
        status: 1,
      },
      method: 'patch',
    }
  );
  return response;
};
