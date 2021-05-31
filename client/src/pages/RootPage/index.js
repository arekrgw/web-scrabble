import { useStore } from '../../stores';
import { useState } from 'react';
import { Flex, Input, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import TileTitle from '../../components/TileTitle';

const MainPage = () => {
  const [playerName, setPlayerName] = useState('');
  const { gameStore } = useStore();

  return (
    <Flex
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <TileTitle title="Scrabble" size="normal" />
      <Flex flexDirection="column" width="25%" alignItems="center" mt="100px">
        <FormControl id="name">
          <FormLabel>Podaj swój nick</FormLabel>
          <Input
            type="text"
            onChange={(ev) => setPlayerName(ev.target.value)}
            value={playerName}
            focusBorderColor="green.500"
            mb="7"
          />
        </FormControl>
        <Button
          variant="solid"
          colorScheme="green"
          disabled={!playerName.length}
          width="100%"
          onClick={() => gameStore.initConnection(playerName)}
        >
          Dołącz do gry!
        </Button>
      </Flex>
    </Flex>
  );
};

export default observer(MainPage);
