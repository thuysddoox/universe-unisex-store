import React, { useEffect, useState } from 'react';
import { StorageKeys, localStorageGet, storageClear, useQueryCart } from '@api';
import { CartItem, User } from '@interfaces';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';
import { SafeAny } from '../interfaces/common';

interface UserContextProps {
  currentUser?: User;
  contextLoaded: boolean;
  setCurrentUser?: (val: any) => void;
  logout?: () => void;
  refetchCart?: SafeAny;
}
export const UserContext = React.createContext<UserContextProps>({
  currentUser: null,
  contextLoaded: false,
});

export const useUserContext = () => React.useContext(UserContext);

export const UserContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState<User>(null);
  const [contextLoaded, setContextLoaded] = useState<boolean>(false);
  const { data: CartResp, refetch } = useQueryCart();
  const router = useRouter();

  const getUserInfo = async () => {
    const currentUser = localStorageGet(StorageKeys.USER_INFO);
    if (!isEmpty(currentUser)) {
      setCurrentUser(currentUser);
    }
    setContextLoaded(true);
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
        refetchCart: refetch,
      }}
    >
      {React.Children.toArray(props.children)}
    </UserContext.Provider>
  );
};
