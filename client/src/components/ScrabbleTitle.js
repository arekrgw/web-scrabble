import { Flex } from '@chakra-ui/react';
import LetterTile from './LetterTile';

const ScrabbleTitle = (props) => {
  return (
    <Flex width="fit-content" {...props}>
      <LetterTile letter="s" points="1" mr="5px" transform="rotate(3deg)" />
      <LetterTile letter="c" points="3" mr="5px" transform="rotate(-1deg)"/>
      <LetterTile letter="r" points="1" mr="5px" transform="rotate(5deg)"/>
      <LetterTile letter="a" points="1" mr="5px" transform="rotate(-4deg)"/>
      <LetterTile letter="b" points="3" mr="5px" transform="rotate(182deg)"/>
      <LetterTile letter="b" points="3" mr="5px" transform="rotate(-6deg)"/>
      <LetterTile letter="l" points="1" mr="5px" transform="rotate(2deg)"/>
      <LetterTile letter="e" points="1" transform="rotate(3deg)"/>
    </Flex>
  );
};

export default ScrabbleTitle;
