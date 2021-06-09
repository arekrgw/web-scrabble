import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';

const DirectionRadio = () => {
  const {
    gameStore: { direction, setDirection },
  } = useStore();

  return (
    <RadioGroup
      value={direction}
      onChange={setDirection}
      colorScheme="green"
      pl="45px"
    >
      <Stack spacing="5px">
        <Radio value="vertical">Pionowo</Radio>
        <Radio value="horizontal">Poziomo</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default observer(DirectionRadio);
