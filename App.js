import React from "react";
import { Provider } from "react-native-paper";
import { StatusBar,LogBox} from "react-native";
import { theme } from "./src/core/theme";
import Navigator from "./src/navigation";
import { Provider as StoreProvider } from "react-redux";
import store from "./src/redux/store";
import { SafeAreaProvider } from "react-native-safe-area-context";

LogBox.ignoreLogs(["Warning: Can't perform a"]);
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
export default function App() {
  return (
    <>
      <StoreProvider store={store}>
        <Provider theme={theme}>
          <StatusBar barStyle={"dark-content"} animated={true} />
          <SafeAreaProvider>
            <Navigator />
          </SafeAreaProvider>
        </Provider>
      </StoreProvider>
    </>
  );
}
