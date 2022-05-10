import { createContext } from "react";

export interface IAppState {
  account?: { username: string; address: string };
  walletConnected: boolean;
  walletAddress?: string | null;
}

interface IAppContext {
  state: IAppState;
  updateState?: (change: Partial<IAppState>) => void;
}

export const AppContext = createContext<IAppContext>({
  state: { walletConnected: false },
});
