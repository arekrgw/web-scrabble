import { Text } from '@chakra-ui/react';
import { useStore } from '../../stores';

const Lobby = () => {
  const { gameStore } = useStore();
  return (
    <Text>
      Waiting in lobby for other players. {gameStore.playerName} twoje id:{' '}
      {gameStore.sid}
    </Text>
  );
};

export default Lobby;
