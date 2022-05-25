import { createContext } from "react";

export interface IAppState {
  /**
   * Current logged in account
   */
  account?: { username: string; address: string };

  /**
   * jwt token for auth with api
   */
  authToken?: string;

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
