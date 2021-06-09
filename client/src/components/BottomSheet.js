import { Flex, Tooltip } from '@chakra-ui/react';
import { useStore } from '../stores';
import { observer } from 'mobx-react-lite';
import { LETTERS } from '../__app/constants';
import LetterTile from './LetterTile';
import DirectionRadio from './DirectionRadio';
import WordEnter from './WordEnter';

const BottomSheet = () => {
  const {
    gameStore: { playersLetters },
  } = useStore();
  return (
    <Flex alignItems="center" px="45px" h="100%">
      <Flex flexDirection="column" justifyContent="center">
        <Tooltip label="Twoje litery" placement="top">
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
        </Tooltip>
      </Flex>
      <Flex flex="1">
        <WordEnter />
      </Flex>
      <Flex>
        <DirectionRadio />
      </Flex>
    </Flex>
  );
};

export default observer(BottomSheet);
