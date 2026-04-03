import { PropsWithChildren } from "react"
import TanstackQueryClientProvider from "../tanstack-query-client-provider/tanstack-query-client-provider"
import { ThemeProvider } from "next-themes"

interface AppProviderProps extends PropsWithChildren {}

const AppProvider = ({
    children
}: AppProviderProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
    >
      <TanstackQueryClientProvider>
        {children}
      </TanstackQueryClientProvider>
    </ThemeProvider>
  )
}

export default AppProvider