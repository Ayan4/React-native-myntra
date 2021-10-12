import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { store } from "./app/store";
import ProductListing from "./app/components/screens/ProductListing";
import tw from "tailwind-react-native-classnames";
import Sort from "./app/components/UIComponents/Sort";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <ProductListing />
          <View
            style={tw`absolute bottom-0 border border-red-500 w-full flex justify-start`}
          >
            <Sort />
          </View>
        </View>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative"
  }
});
