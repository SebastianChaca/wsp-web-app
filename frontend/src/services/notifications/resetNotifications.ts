import { makePrivateRequest } from '../makePrivateRequest';

interface response {
  ok: boolean;
}
export const resetNotificationsAPI = async (uid: string) => {
  await makePrivateRequest<response>('notifications/messages/reset', {
    data: { uid },
    method: 'post',
  });
};
