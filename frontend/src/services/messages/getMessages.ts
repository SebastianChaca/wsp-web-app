import { createAsyncThunk } from '@reduxjs/toolkit';
import { makePrivateRequest } from '../makePrivateRequest';
import { serverMessageResponse } from '../../types/message/message';
import { sanitizeMessages } from '../../utils/sanitizeMessages';

interface MessageAPIresponse {
  ok: boolean;
  mensajes: serverMessageResponse[];
}
export const getMessages = createAsyncThunk(
  'chat/messages',
  async (uid: string) => {
    const response = await makePrivateRequest<MessageAPIresponse>(
      `/messages/${uid}`,
    );

    // TODO: ver si sirve modelizar esto para el front o usarlo como viene del back
    // lo mejor es usarlo como viene pero ya lo tenia hecho asi
    const sanitMessages = sanitizeMessages(response.mensajes);

    return sanitMessages;
  },
);
