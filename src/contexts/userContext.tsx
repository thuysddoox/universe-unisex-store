import React, { useEffect, useState } from 'react';
import { StorageKeys, localStorageGet } from '@api';
import { User } from '@interfaces';
import { isEmpty } from 'lodash';
import { useRouter } from 'next/router';

interface UserContextProps {
  currentUser?: User;
  contextLoaded: boolean;
  setCurrentUser?: (val: any) => void;
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

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        contextLoaded
      }}
    >
      {React.Children.toArray(props.children)}
    </UserContext.Provider>
  );
};
