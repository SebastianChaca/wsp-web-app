import { makePrivateRequest } from '../makePrivateRequest';
import { friend } from '../../types/friend/friend';
import { FRIEND } from './const';

interface FriendApiResponse {
  ok: boolean;
  friend: friend;
}

export const blockFriend = async (friendId: { friendId: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>(
    `${FRIEND}/status/${friendId}`,
    {
      data: {
        status: 2,
      },
      method: 'patch',
    }
  );
  return response.friend;
};
