import { Flex } from '@chakra-ui/react';
import LetterTile from './LetterTile';
import { LETTERS } from '../__app/constants';

const ScrabbleTitle = (props) => {
  return (
    <Flex width="fit-content" {...props}>
      <LetterTile {...LETTERS.s} mr="5px" transform="rotate(3deg)" />
      <LetterTile {...LETTERS.c} mr="5px" transform="rotate(-1deg)" />
      <LetterTile {...LETTERS.r} mr="5px" transform="rotate(5deg)" />
      <LetterTile {...LETTERS.a} mr="5px" transform="rotate(-4deg)" />
      <LetterTile {...LETTERS.b} mr="5px" transform="rotate(182deg)" />
      <LetterTile {...LETTERS.b} mr="5px" transform="rotate(-6deg)" />
      <LetterTile {...LETTERS.l} mr="5px" transform="rotate(2deg)" />
      <LetterTile {...LETTERS.e} transform="rotate(3deg)" />
    </Flex>
  );
};

export default ScrabbleTitle;
