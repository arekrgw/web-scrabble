import { useStore } from '../../stores';
import { useState } from 'react';
import { routes } from '../../__app/routes';
import { StyledH1 } from './style';
import { Flex, Input, FormControl, FormLabel, Button } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import ScrabbleTitle from '../../components/ScrabbleTitle';

const MainPage = () => {
  const [playerName, setPlayerName] = useState('');
  const { routerStore, gameStore } = useStore();

  return (
    <Flex
      minH="100vh"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
    >
      <ScrabbleTitle />
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

  // return (
  //   <>
  //     <StyledH1>Scrabble!</StyledH1>
  //     {gameStore.sid && <p>{gameStore.sid}</p>}
  //     <input type="text" value={playerName} onChange={(ev) => setPlayerName(ev.target.value)} />
  //     <button disabled={!playerName.length} onClick={() => gameStore.initConnection(playerName)}>Dołącz do pokoju</button>
  //   </>
  // );
};

export default observer(MainPage);
