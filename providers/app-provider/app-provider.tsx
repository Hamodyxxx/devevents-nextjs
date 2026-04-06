import { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import TrpcClientProvider from "../tanstack-query-client-provider/tanstack-query-client-provider"
import { NuqsAdapter } from "nuqs/adapters/next/app"

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
      <TrpcClientProvider>
        <NuqsAdapter>
        {children}
        </NuqsAdapter>
      </TrpcClientProvider>
    </ThemeProvider>
  )
}

export default AppProvider