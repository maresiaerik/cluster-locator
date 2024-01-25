"use client";

import { persistor, setupStore } from "@/lib/redux/store";
import { ChakraProvider } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

export function Providers({ children }: { children: React.ReactNode }): ReactElement {
  return (
    <Provider store={setupStore()}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>{children}</ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
