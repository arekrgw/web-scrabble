import { Flex, Text } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../stores';

const LeftPanel = () => {
  const {
    gameStore: { currentPlayerTurn, timeForTurn, socketHandler },
  } = useStore();

  const [nextPlayerName, nextPlayerId] = currentPlayerTurn?.length ? currentPlayerTurn : [null, null];

  return (
    <Flex
      h="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      {socketHandler?.id === nextPlayerId ? (
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
          Teraz kolej gracza: {nextPlayerName || ''}
        </Text>
      )}
      <Text fontSize="3xl" fontWeight="bold" w="fit-content" textAlign="center">
        {timeForTurn}
      </Text>
    </Flex>
  );
};

export default observer(LeftPanel);
