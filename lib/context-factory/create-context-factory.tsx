import { Context, createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { capitalize } from "../string-utils";

export type ContextFactoryReturn<T, N extends string, P = {}> = {
  [K in `use${Capitalize<N>}Context`]: () => T;
} & {
  [K in `${Capitalize<N>}ContextProvider`]: (props: PropsWithChildren<P>) => ReactNode;
} & {
  [K in `${Capitalize<N>}Context`]: Context<T>
};

interface CreateContextFactoryArgs<T, N extends string, P = {}> {
  name: N;
  useInitializer: (props: P) => T;
  initialValue?: T;
  isValid?: (data?: T) => boolean 
}

export function createContextFactory<T, const N extends string, P = {}>({
  name,
  useInitializer,
  initialValue,
  isValid
}: CreateContextFactoryArgs<T, N, P>): ContextFactoryReturn<T, N, P> {
  const context = createContext<T | undefined>(initialValue);  
  const capitalizedName = capitalize(name); 


  const useContextWithGuard = () => {
    const contextData = useContext(context);
    if (isValid ? !isValid(contextData) : contextData === undefined) {
      throw new Error(
        `use${capitalizedName}Context must be used inside ${capitalizedName}ContextProvider`
      );
    }
    return contextData as T;
  };

  const ContextProvider = ({ children, ...props }: PropsWithChildren<P>) => {
    const contextData = useInitializer(props as P);
    return <context.Provider value={contextData}>{children}</context.Provider>;
  };


  const hookName = `use${capitalizedName}Context` as `use${Capitalize<N>}Context`;
  const providerName = `${capitalizedName}ContextProvider` as `${Capitalize<N>}ContextProvider`;
  const contextName = `${capitalizedName}Context` as `${Capitalize<N>}Context`;

  return {
    [hookName]: useContextWithGuard,
    [providerName]: ContextProvider,
    [contextName]: context
  } as ContextFactoryReturn<T, N, P>;
}