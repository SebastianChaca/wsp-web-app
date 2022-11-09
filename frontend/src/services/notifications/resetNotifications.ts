import { makePrivateRequest } from '../makePrivateRequest';

interface response {
  ok: true;
}
export const resetNotifications = async (uid: string) => {
  const response = await makePrivateRequest<response>(
    'notifications/messages/reset',
    {
      data: { uid },
      method: 'post',
    },
  );
  return response;
};
