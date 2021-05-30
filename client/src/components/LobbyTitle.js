import { Flex } from '@chakra-ui/react';
import LetterTile from './LetterTile';
import { LETTERS } from '../__app/constants';

const LobbyTitle = (props) => {
  return (
    <Flex width="fit-content" {...props}>
      <LetterTile {...LETTERS.l} mr="5px" transform="rotate(3deg)" />
      <LetterTile {...LETTERS.o} mr="5px" transform="rotate(-1deg)" />
      <LetterTile {...LETTERS.b} mr="5px" transform="rotate(5deg)" />
      <LetterTile {...LETTERS.b} mr="5px" transform="rotate(-4deg)" />
      <LetterTile {...LETTERS.y} transform="rotate(2deg)" />
    </Flex>
  );
};

export default LobbyTitle;
