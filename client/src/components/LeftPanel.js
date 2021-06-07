import { Flex, Text } from '@chakra-ui/react';

const LeftPanel = () => {
  return (
    <Flex h="100%" alignItems="center" justifyContent="center">
      <Text
        color="green.600"
        fontSize="3xl"
        fontWeight="bold"
        w="fit-content"
        textAlign="center"
      >
        Twoja
        <br />
        kolej!
      </Text>
    </Flex>
  );
};

export default LeftPanel;
