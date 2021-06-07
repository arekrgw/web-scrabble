import { GridItem } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';
import LetterTile from './LetterTile';
import { LETTERS } from '../__app/constants';
import { useStore } from '../stores';

const BoardField = ({ onClick, tile, coords, responsiveBox, ...rest }) => {
  const {
    gameStore: { focusedTile },
  } = useStore();
  console.log(tile);
  return (
    <GridItem
      onClick={() => (onClick ? onClick(coords) : null)}
    >
      <LetterTile
        letter={tile.letter}
        premium={tile.premium}
        points={LETTERS[tile.letter]?.points || null}
        size="game"
        cursor="pointer"
        focused={coords.x === focusedTile?.x && coords.y === focusedTile?.y}
        responsiveBox={responsiveBox}
        {...rest}
      />
    </GridItem>
  );
};

export default observer(BoardField);
