import { Text } from '@chakra-ui/react';
import { useStore } from '../../stores';
import LobbyTitle from '../../components/LobbyTitle'

const Lobby = () => {
  const { gameStore } = useStore();
  return (
    <>
      <Text>
        Waiting in lobby for other players. {gameStore.playerName} twoje id:{' '}
        {gameStore.sid}
      </Text>
      <LobbyTitle />
    </>
  );
};

export default Lobby;
