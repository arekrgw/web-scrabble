import { Text, Flex } from '@chakra-ui/react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';

const RightPanel = () => {
  const {
    gameStore: { playersScoreboard },
  } = useStore();

  return (
    <Flex p="10px" alignItems="center" flexDirection="column">
      <Text fontSize="3xl" fontWeight="bold">
        Tablica wyników
      </Text>
      {playersScoreboard.map((plr, idx) => (
        <Text key={plr[0]}>
          {idx + 1}. {plr[0]} {plr[1]} pkt.
        </Text>
      ))}
    </Flex>
  );
};

export default observer(RightPanel);
