import { Radio, RadioGroup, Stack } from '@chakra-ui/react';

const DirectionRadio = () => {
  return (
    <RadioGroup defaultValue="vertical" colorScheme="green" pl="45px">
      <Stack spacing="5px">
        <Radio value="vertical">Pionowo</Radio>
        <Radio value="horizontal">Poziomo</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default DirectionRadio;
