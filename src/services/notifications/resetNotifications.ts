import { makePrivateRequest } from '../makePrivateRequest';

interface response {
  ok: boolean;
}
export const resetNotificationsAPI = async (uid: string) => {
  await makePrivateRequest<response>(`friend/${uid}`, {
    data: { notifications: 0 },
    method: 'patch',
  });
};
