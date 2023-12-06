import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';
import { MESSAGE } from './const';

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
