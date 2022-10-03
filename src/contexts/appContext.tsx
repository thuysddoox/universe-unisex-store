import React from 'react';

interface AppContextProps {
}

export const AppContext = React.createContext<AppContextProps>({

});

export const AppContextProvider = (props) => {
  return (
    <AppContext.Provider
      value={{}}
    >
      {React.Children.toArray(props.children)}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
