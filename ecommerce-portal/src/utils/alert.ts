import { notification } from 'ant-design-vue';

export default {
  success(message: string, description?: string) {
    notification.success({
      message,
      description,
      duration: 3,
    });
  },
  error(message: string, description?: string) {
    notification.error({
      message,
      description,
      duration: 3,
    });
  },
  info(message: string, description?: string) {
    notification.info({
      message,
      description,
      duration: 3,
    });
  },
  warning(message: string, description?: string) {
    notification.warning({
      message,
      description,
      duration: 3,
    });
  },
};
