import { Text, Flex, Spinner } from '@chakra-ui/react';
import { useStore } from '../../stores';
import TileTitle from '../../components/TileTitle';
import { observer } from 'mobx-react-lite';
import { routes } from '../../__app/routes';

const Lobby = () => {
  const {
    gameStore: { playersInLobby, socketHandler },
    routerStore,
  } = useStore();

  if (!socketHandler) {
    routerStore.push(routes.root);
    return null;
  }

  return (
    <Flex
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <TileTitle title="Lobby" size="normal" />
      <Flex flexDirection="column" alignItems="center" mt="50px">
        <Flex alignItems="center" mb="4">
          <Text fontSize="xl" fontWeight="semibold">
            Czekam na resztę graczy
          </Text>
          <Spinner size="sm" ml="2" color="green.500" />
        </Flex>

        <Flex flexDirection="column" alignItems="center" minH="150px">
          {playersInLobby?.players?.map((pName, idx) => (
            <Text fontSize="lg" key={`${pName}_${idx}`}>
              {pName}
            </Text>
          ))}
        </Flex>
        <Flex mt="7">
          <Text
            fontSize="xl"
            fontWeight="bold"
            color={
              playersInLobby.current === playersInLobby.max
                ? 'green.500'
                : 'red'
            }
          >
            {playersInLobby.current}/{playersInLobby.max}
          </Text>
        </Flex>
        <Text>Gra rozpocznie się automatycznie</Text>
      </Flex>
    </Flex>
  );
};

export default observer(Lobby);
