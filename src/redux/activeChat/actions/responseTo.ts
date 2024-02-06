import { messageUI } from '../../../types/message/message';
import { capitalizeFirstLetter } from '../../../utils/capitalizeFirstLetter';

export const responseTo = (action: messageUI | null) => {
  if (action) {
    const { to, from, emailTo, nameTo, date, message, id } = action;
    return {
      to,
      from,
      date,
      emailTo,
      nameTo: nameTo && capitalizeFirstLetter(nameTo),
      message,
      id,
    };
  }
  return undefined;
};
