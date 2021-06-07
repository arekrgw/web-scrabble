import { GridItem } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import LetterTile from './LetterTile';
import { LETTERS } from '../__app/constants';

const BoardField = ({ onClick, tile, coords, responsiveBox, ...rest }) => {
  return (
    <GridItem onClick={() => (onClick ? onClick(coords) : null)}>
      <LetterTile
        letter={tile.letter}
        premium={tile.premium}
        points={LETTERS[tile.letter]?.points || null}
        size="game"
        cursor="pointer"
        responsiveBox={responsiveBox}
        {...rest}
      />
    </GridItem>
  );
};

export default observer(BoardField);
