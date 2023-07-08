import { notification } from 'ant-design-vue';
import { IconType } from 'ant-design-vue/es/notification';

type MessageType = IconType;

type NotifyParams = {
  type: MessageType;
  message: string;
};

export const notify = ({ type, message }: NotifyParams) => {
  notification[type]({
    message,
  });
};
