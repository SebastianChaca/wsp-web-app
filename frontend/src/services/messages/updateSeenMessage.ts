import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';
import { MESSAGE } from './const';
// TODO hay que cambiar esto aca y en el back, el id es de un Friend, no de mensaje, habria que mandarlo por body para que se entienda mejor
export const updateSeenMessage = async (id: string, messagesId: string[]) => {
  const response = await makePrivateRequest<serverMessageResponse[]>(
    `/${MESSAGE}/${id}/updateseen`,
    {
      method: 'patch',
      data: { messagesId },
    }
  );
  return response;
};
