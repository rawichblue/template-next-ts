import React from 'react';
import { Modal as AntModal, ModalProps } from 'antd';

export interface ConfirmModalProps extends Pick<ModalProps, 'open' | 'onOk' | 'onCancel' | 'confirmLoading'> {
  title?: string;
  description?: string;
  okText?: string;
  cancelText?: string;
}

export const ConfirmModal = ({
  title = 'ยืนยันการทำรายการ',
  description = 'คุณต้องการยืนยันการทำรายการนี้ใช่หรือไม่?',
  okText = 'ยืนยัน',
  cancelText = 'ยกเลิก',
  ...props
}: ConfirmModalProps) => {
  return (
    <AntModal title={title} okText={okText} cancelText={cancelText} {...props}>
      <p className='text-gray-600'>{description}</p>
    </AntModal>
  );
};

export default AntModal;
