import { useCallback, useContext, useState } from "react";
import { AppContext, IAppState, INITIAL_STATE } from "./AppContext";

export const StateProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<IAppState>(INITIAL_STATE);
  const updateState = useCallback(
    (change: Partial<IAppState>) => {
      setState((s) => ({ ...s, ...change }));
    },
    [setState]
  );

  return ( 
    <AppContext.Provider value={{ state, updateState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => useContext(AppContext);
