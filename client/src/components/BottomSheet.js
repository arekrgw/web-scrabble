import { Flex, Text } from '@chakra-ui/react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';
import { LETTERS } from '../__app/constants';
import LetterTile from './LetterTile';

const BottomSheet = () => {
  const {
    gameStore: { playersLetters },
  } = useStore();
  return (
    <Flex alignItems="center" p="10px" h="100%">
      <Flex flexDirection="column" justifyContent="center">
        <Text fontWeight="bold">Twoje litery</Text>
        <Flex>
          {playersLetters?.map((letter, idx) => (
            <LetterTile
              key={`${letter}-${idx}`}
              letter={letter}
              points={LETTERS[letter].points}
              size="sheet"
              mr="5px"
            />
          ))}
        </Flex>
      </Flex>
      <Text>Wpisywanie slowa i ustawianie kierunku not done</Text>
    </Flex>
  );
};

export default observer(BottomSheet);
