import { useEffect } from 'react';
import {
  Input,
  Flex,
  InputGroup,
  InputRightElement,
  IconButton,
  Icon,
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';

const WordEnter = () => {
  const {
    gameStore: {
      focusedTile,
      sendWord,
      currentPlayerTurn,
      socketHandler,
      wordEnterValue,
      setWordEnterValue,
    },
  } = useStore();

  const [, nextPlayerId] = currentPlayerTurn;

  useEffect(() => {
    if (!focusedTile) setWordEnterValue('');
  }, [focusedTile, setWordEnterValue]);

  const inputStatus = () => {
    if (socketHandler?.id !== nextPlayerId)
      return { disabled: true, placeholder: 'Czekaj na swoją kolej' };
    if (!focusedTile)
      return { disabled: true, placeholder: 'Wybierz klocek startowy' };

    return { disabled: false, placeholder: 'Wpisz słowo' };
  };

  return (
    <Flex w="100%" pl="45px">
      <InputGroup alignItems="center">
        <Input
          borderColor="green.500"
          _hover={{ borderColor: 'green.500' }}
          focusBorderColor="green.600"
          size="lg"
          value={wordEnterValue}
          onChange={(e) => setWordEnterValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendWord()}
          {...inputStatus()}
        />
        <InputRightElement h="100%" p="1px">
          <IconButton
            mr="2px"
            h="100%"
            disabled={!focusedTile}
            variant="ghost"
            onClick={sendWord}
            colorScheme="green"
            outline={false}
            _focus={{ boxShadow: 'none' }}
            icon={<Icon as={FiSend} />}
          />
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default observer(WordEnter);
