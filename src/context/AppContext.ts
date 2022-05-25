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

  /**
   * Indicates if state has been hydrated
   */
  ready: boolean;
}

export const INITIAL_STATE = {
  walletConnected: false, ready: false
}

interface IAppContext {
  state: IAppState;
  updateState?: (change: Partial<IAppState>) => void;
}

export const AppContext = createContext<IAppContext>({
  state: INITIAL_STATE,
});
