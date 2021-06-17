import { observer } from 'mobx-react-lite';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import TileTitle from '../../components/TileTitle';
import { useStore } from '../../stores';
import { useMemo } from 'react';

const EndPage = () => {
  const {
    gameStore: { socketHandler, finalScoreboard },
  } = useStore();

  const computedWinner = useMemo(() => {
    if (!finalScoreboard?.length) return {};

    const [cpy] = finalScoreboard.slice().sort((a, b) => b[1] - a[1]);

    return {
      name: cpy[2] === socketHandler?.id ? 'Ty!' : cpy[0],
      score: cpy[1],
    };
  }, [finalScoreboard, socketHandler]);

  return (
    <Flex
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      bg="url(fireworks.gif) no-repeat center 20%"
    >
      <TileTitle title="Zwyciężca" size="normal" />
      <Flex flexDirection="column" alignItems="center" mt="50px" >
        {finalScoreboard?.length ? (
          <Flex flexDirection="column" alignItems="center">
            <Text fontWeight="bold" fontSize="5xl">{computedWinner.name}</Text>
            <Text fontSize="2xl">{computedWinner.score} pkt.</Text>
          </Flex>
        ) : (
          <Spinner size="lg" ml="2" color="green.500" />
        )}
      </Flex>
    </Flex>
  );
};

export default observer(EndPage);
