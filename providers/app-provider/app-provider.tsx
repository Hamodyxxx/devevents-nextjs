import { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import TrpcClientProvider from "../trpc-client-provider/trpc-client-provider"

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
        {children}
      </TrpcClientProvider>
    </ThemeProvider>
  )
}

export default AppProvider