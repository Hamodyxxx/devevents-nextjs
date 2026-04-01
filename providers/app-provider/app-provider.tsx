import { PropsWithChildren } from "react"
import TanstackQueryClientProvider from "../tanstack-query-client-provider/tanstack-query-client-provider"

interface AppProviderProps extends PropsWithChildren {}

const AppProvider = ({
    children
}: AppProviderProps) => {
  return (
    <TanstackQueryClientProvider>
        {children}
    </TanstackQueryClientProvider>
  )
}

export default AppProvider