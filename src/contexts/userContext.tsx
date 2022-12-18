import React, { useEffect, useState, useCallback } from 'react';
import { StorageKeys, localStorageGet, storageClear, useQueryCart } from '@api';
import { CartItem, User } from '@interfaces';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { SafeAny } from '../interfaces/common';
import { localStorageSet } from '../network/storage';

interface UserContextProps {
  currentUser?: User;
  contextLoaded: boolean;
  setCurrentUser?: (val: any) => void;
  logout?: () => void;
  refetchCart?: SafeAny;
  updateUserInfo?: (user: User) => void;
}
export const UserContext = React.createContext<UserContextProps>({
  currentUser: null,
  contextLoaded: false,
});

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [contextLoaded, setContextLoaded] = useState<boolean>(false);
  const router = useRouter();

  const getUserInfo = async () => {
    const currentUser = localStorageGet(StorageKeys.USER_INFO);
    if (!isEmpty(currentUser)) {
      setCurrentUser(currentUser);
    }
    setContextLoaded(true);
  };
  const updateUserInfo = async (user: User) => {
    setCurrentUser(user);
    localStorageSet(StorageKeys.USER_INFO, user);
  };
  const logout = async () => {
    storageClear();
    setCurrentUser(null);
    setContextLoaded(false);
    router.reload();
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        contextLoaded,
        logout,
        updateUserInfo,
      }}
    >
      {React.Children.toArray(props.children)}
    </UserContext.Provider>
  );
};
