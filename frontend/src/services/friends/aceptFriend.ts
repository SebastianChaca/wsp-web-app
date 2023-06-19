import { makePrivateRequest } from '../makePrivateRequest';
import { friend } from '../../types/session/session';

interface FriendApiResponse {
  ok: boolean;
  friend: friend;
}

export const aceptFriend = async (friendId: { friendId: string }) => {
  const response = await makePrivateRequest<FriendApiResponse>(
    'friends/aceptfriend',
    {
      data: friendId,
      method: 'post',
    }
  );
  return response.friend;
};
