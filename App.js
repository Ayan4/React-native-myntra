import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, SafeAreaView } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { store } from "./app/store";
import ProductListing from "./app/components/screens/ProductListing";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.container}>
          <ProductListing />
        </SafeAreaView>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    position: "relative",
    paddingTop: 25
  }
});
