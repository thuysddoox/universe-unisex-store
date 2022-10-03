import React, { useRef } from 'react';
import { SafeAny } from '@interfaces';

interface ScrollContextProps {
  scrollRef: React.RefObject<SafeAny>;
}

export const ScrollContext = React.createContext<ScrollContextProps>({
  scrollRef: null,
});

export const ScrollContextProvider = (props) => {
  const scrollRef = useRef({
    scrollPos: 0,
  });

  return (
    <ScrollContext.Provider
      value={{
        scrollRef,
      }}
    >
      {React.Children.toArray(props.children)}
    </ScrollContext.Provider>
  );
};
