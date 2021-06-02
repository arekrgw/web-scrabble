import { useStore } from '../../stores';
import { useState } from 'react';
import {
  Flex,
  Input,
  FormControl,
  FormLabel,
  Button,
  Text,
  Icon,
  useMediaQuery,
} from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import TileTitle from '../../components/TileTitle';
import { MdPhonelinkErase } from 'react-icons/md';

const MainPage = () => {
  const [isLargerThan1110] = useMediaQuery('(min-width: 1100px)');
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
        {isLargerThan1110 ? (
          <>
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
          </>
        ) : (
          <>
            <Icon as={MdPhonelinkErase} w="50px" h="50px" />
            <Text textAlign="center" mt="5">
              Aby zagrać znajdź urządzenie z większym ekranem 🙄
            </Text>
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default observer(MainPage);
