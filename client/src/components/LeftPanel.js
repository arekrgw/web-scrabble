import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';

const LeftPanel = () => {
  const {
    gameStore: { currentPlayerTurn, playerName, timeForTurn },
  } = useStore();

  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {playerName === currentPlayerTurn ? (
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
      ) : (
        <Text
          color="red.400"
          fontSize="3xl"
          fontWeight="bold"
          w="fit-content"
          textAlign="center"
        >
          Teraz kolej gracza: {currentPlayerTurn || ''}
        </Text>
      )}
      <Text fontSize="3xl" fontWeight="bold" w="fit-content" textAlign="center">
        {timeForTurn}
      </Text>
    </Flex>
  );
};

export default observer(LeftPanel);
