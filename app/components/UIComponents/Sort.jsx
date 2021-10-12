import React from "react";
import {
  Button,
  Actionsheet,
  useDisclose,
  Center,
  NativeBaseProvider
} from "native-base";
import tw from "tailwind-react-native-classnames";

export function Example() {
  const { isOpen, onOpen, onClose } = useDisclose();
  return (
    <>
      <Button style={tw`w-1/2`} onPress={onOpen}>
        Actionsheet
      </Button>

      <Actionsheet style={tw`w-full`} isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Actionsheet.Item>Option 1</Actionsheet.Item>
          <Actionsheet.Item>Option 2</Actionsheet.Item>
          <Actionsheet.Item>Option 3</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
}

export default () => {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
};
