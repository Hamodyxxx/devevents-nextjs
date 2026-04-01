import { ContextFactoryReturn, createContextFactory } from "./create-context-factory";

type ContextDefinitions = Record<
  string,
  {
    useInitializer: (props?: any) => any;
    initialValue?: any;
    isValid?: (data?: any) => boolean;
  }
>;

export type MultiContextReturn<T extends ContextDefinitions> = {
  [K in keyof T]: ContextFactoryReturn<
    ReturnType<T[K]["useInitializer"]>,
    K & string,
    Parameters<T[K]["useInitializer"]>[0]
  >;
};


export function createMultiContext<T extends ContextDefinitions>(
  contexts: T
): MultiContextReturn<T> {
  const result = {} as MultiContextReturn<T>;

  for (const key in contexts) {
    const { useInitializer, initialValue, isValid } = contexts[key];
    const bundle = createContextFactory({
      name: key,
      useInitializer,
      initialValue,
      isValid,
    });

    result[key] = bundle;
  }

  return result as MultiContextReturn<T>;
}