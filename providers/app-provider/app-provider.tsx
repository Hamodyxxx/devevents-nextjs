import { PropsWithChildren } from "react"
import { ThemeProvider } from "next-themes"
import TrpcClientProvider from "../tanstack-query-client-provider/tanstack-query-client-provider"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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