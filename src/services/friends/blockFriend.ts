import { makePrivateRequest } from '../makePrivateRequest';
import { friendFromApi } from '../../types/friend/friend';
import { FRIEND } from './const';

export const blockFriend = async (friendId: string) => {
  const response = await makePrivateRequest<friendFromApi>(
    `${FRIEND}/status/${friendId}`,
    {
      data: {
        status: 2,
      },
      method: 'patch',
    }
  );
  return response;
};
