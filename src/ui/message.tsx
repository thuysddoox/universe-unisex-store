import { message } from 'antd';
import { isString } from 'lodash';

export const Message = {
  info: message.info,
  success: message.success,
  warning: message.warning,
  open: message.open,

  error: (e: any) => {
    if (isString(e)) {
      message.error(e);
    } else {
      const msg = (e?.message ?? '') + (e?.code ? ` (${e?.code})` : '');
      message.error(msg);
    }
  },
  unknownError: (e: any) => {
    console.log(e);
    message.error('Unknown error. Please try again.');
  },
};
