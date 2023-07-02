import { makePrivateRequest } from '../makePrivateRequest';
import { friend } from '../../types/friend/friend';

interface FriendApiResponse {
  ok: boolean;
  friend: friend;
}

export const blockFriend = async (friendId: { friendId: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>(
    'friends/blockFriend',
    {
      data: friendId,
      method: 'post',
    }
  );
  return response.friend;
};
