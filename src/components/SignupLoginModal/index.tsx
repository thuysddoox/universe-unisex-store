import ChangePasswordPopup from '@components/Form/ChangePassword';
import LoginPopup from '@components/Form/Login';
import SignupPopup from '@components/Form/Signup';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { UserPopupType } from '@interfaces/common';
import { Modal } from '@ui';
import { Grid } from 'antd';
import React, { useState, useEffect } from 'react';
import ForgotPasswordPopup from '@components/Form/ForgotPassword';

const { useBreakpoint } = Grid;

const SignupLoginModal = ({
  visible,
  setVisible,
  type,
}: {
  type?: UserPopupType;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const screens = useBreakpoint();
  const [animated] = useAutoAnimate<HTMLDivElement>(null);
  const [popupType, setPopupType] = useState<UserPopupType>(type ?? 'login');

  function handleModalLoginSigup() {
    setVisible(!visible);
    if (popupType === 'signup' || popupType === 'forgot') changePopup('login');
  }
  function changePopup(type: UserPopupType) {
    setPopupType(type);
  }
  useEffect(() => {
    setPopupType(type);
  }, [type]);
  return (
    <Modal
      centered
      closable
      open={visible}
      footer={null}
      onOk={handleModalLoginSigup}
      onCancel={handleModalLoginSigup}
      width={
        popupType === 'login' || popupType === 'forgot' || popupType === 'changepassword'
          ? screens.xs
            ? '90vw'
            : '500px'
          : screens.xl
          ? '50vw'
          : screens.lg
          ? '70vw'
          : screens.md
          ? '80vw'
          : '90vw'
      }
      bodyStyle={{
        background: '#ffffff',
        margin: '32px 0',
      }}
    >
      <div ref={animated} className="w-full h-full">
        {popupType === 'login' ? (
          <LoginPopup changePopup={changePopup} handleModal={handleModalLoginSigup} />
        ) : popupType === 'signup' ? (
          <SignupPopup changePopup={changePopup} handleModal={handleModalLoginSigup} />
        ) : popupType === 'forgot' ? (
          <ForgotPasswordPopup changePopup={changePopup} handleModal={handleModalLoginSigup} />
        ) : (
          <ChangePasswordPopup changePopup={changePopup} handleModal={handleModalLoginSigup} />
        )}
      </div>
    </Modal>
  );
};
export default SignupLoginModal;
