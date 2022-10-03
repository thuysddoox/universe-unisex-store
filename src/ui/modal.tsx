import { Modal as AntdModal, ModalFuncProps, ModalProps } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { ReactNode } from 'react';

export const confirm = (props: ModalFuncProps) => {
  const { className } = props;
  return AntdModal.confirm({
    ...props,
    className: `${className || ''} confirm-modal`,
  });
};

export const warning = (props: ModalFuncProps) => {
  const { className } = props;
  return AntdModal.warning({
    ...props,
    className: `${className || ''} confirm-modal`,
  });
};

export const info = (props: ModalFuncProps) => {
  const { className } = props;
  return AntdModal.info({
    ...props,
    className: `${className || ''} confirm-modal`,
  });
};

export const Modal = (props: ModalProps & { children?: ReactNode }) => {
  const { className } = props;
  return (
    <AntdModal {...props} className={`${className || ''} confirm-modal`} />
  );
};

export const confirmCrawLink = (props: ModalFuncProps) => {
  confirm({
    content: (
      <CloseOutlined
        className="absolute top-3.5 right-3.5"
        onClick={() => {
          AntdModal.destroyAll();
        }}
      />
    ),
    title: `Do you want to get content from the link?`,
    okText: 'Get content',
    cancelText: 'Use your content',
    ...props,
  });
};

interface ConfirmationDialogProps extends ModalFuncProps {
  onClose?: () => void;
}

export const confirmationDialog = (props: ConfirmationDialogProps) => {
  const { onClose } = props;
  confirm({
    content: (
      <CloseOutlined
        className="absolute top-3.5 right-3.5"
        onClick={() => {
          onClose && onClose();
          AntdModal.destroyAll();
        }}
      />
    ),
    okText: 'Yes',
    cancelText: 'No',
    ...props,
  });
};

export const warningDialog = (props: ConfirmationDialogProps) => {
  const { onClose } = props;
  warning({
    content: (
      <CloseOutlined
        className="absolute top-3.5 right-3.5"
        onClick={() => {
          onClose && onClose();
          AntdModal.destroyAll();
        }}
      />
    ),
    okText: 'OK',
    ...props,
  });
};
