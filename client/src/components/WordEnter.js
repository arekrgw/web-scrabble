import { Input, Flex } from '@chakra-ui/react';

const WordEnter = () => {
  return (
    <Flex w="100%" pl="45px">
      <Input
        borderColor="green.500"
        _hover={{ borderColor: 'green.500' }}
        focusBorderColor="green.600"
        size="lg"
        placeholder="Wybierz klocek startowy"
      />
    </Flex>
  );
};

export default WordEnter;
