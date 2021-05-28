import { createContext, useContext } from 'react';
import { RootStore } from './rootStore';

const initializeStores = () => {
  const rootStore = new RootStore();
  return { ...rootStore };
};

export const stores = initializeStores();

const storeContext = createContext();

export const StoreProvider = ({ children }) => {
  return (
    <storeContext.Provider value={stores}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = useContext(storeContext);

  return store;
};
