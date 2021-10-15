import { StatusBar } from "expo-status-bar";
import React from "react";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";
import { store } from "./app/store";
import ProductListing from "./app/components/screens/ProductListing";
import SearchResult from "./app/components/screens/SearchResults";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FilterContainer from "./app/components/screens/FilterContainer";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <StatusBar barStyle={"default"} />
          <Stack.Navigator>
            <Stack.Screen
              name="ProductListing"
              component={ProductListing}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SearchResult"
              component={SearchResult}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="FilterScreen"
              component={FilterContainer}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
  );
}
