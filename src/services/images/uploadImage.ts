import {
  imageServerResponse,
  uploadImage as uploadImageType,
} from '../../types/Images/image';
import { serverMessageResponse } from '../../types/message/message';
import { makePrivateRequest } from '../makePrivateRequest';

export const uploadImage = async (props: uploadImageType) => {
  const formData = new FormData();
  formData.append('image', props.image);
  formData.append('folder', props.folder);

  return makePrivateRequest<imageServerResponse>('/images', {
    method: 'post',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
