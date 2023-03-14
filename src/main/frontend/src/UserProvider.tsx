import React from 'react';

export type UserDto = {
  id: number;
  userName: string;
  email: string;
};

export type UserContextType = {
  user?: UserDto;
  refresh: () => void;
};

const UNAUTHORIZED: UserContextType = {
  user: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refresh: () => {},
};

const Context = React.createContext<UserContextType>(UNAUTHORIZED);

export function useUser() {
  return React.useContext(Context).user;
}

export function useRefreshUser() {
  return React.useContext(Context).refresh;
}

export function UserProvider({ children }: React.PropsWithChildren<unknown>) {
  const [user, setUser] = React.useState<UserDto | undefined>(undefined);
  const [isLoading, setIsLoading] = React.useState(true);

  const refresh = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch('api/getUser', { method: 'get' });
      if (!res.ok) {
        throw 'error';
      }
      setUser(await res.json());
    } catch (e) {
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    refresh();
  }, [refresh]);

  const value = React.useMemo(() => {
    return {
      user,
      refresh,
    };
  }, [refresh, user]);

  return <Context.Provider value={value}>{isLoading ? '...Loading' : children}</Context.Provider>;
}
