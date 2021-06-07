import { Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';
import { observer } from 'mobx-react-lite';
import LetterTile from './LetterTile';
import { LETTERS } from '../__app/constants';

// const STYLES = {
//   normalField: {
//     borderRadius: '7px',
//     box: 'calc((100vh - 100px - 28px) / 15)', // 100px for header/podstawke/legende na klocki, 28px gap w gridzie, 15 ilosc klockow
//     fontSize: '11px',
//     corner: '1',
//     pointstype: 'sm',
//   },
//   TWS: {
//     background: '#ff4d4d',
//   },
//   DWS: {
//     background: '#F5C134',
//   },
//   TLS: {
//     background: '#347AF5',
//   },
//   DLS: {
//     background: '#6DA3F5',
//   },
// };

const BoardField = ({ onClick, tile, coords, ...rest }) => {
  const theme = useTheme();

  return (
    <Flex onClick={() => (onClick ? onClick(coords) : null)}>
      <LetterTile
        letter={tile.letter}
        premium={tile.premium}
        points={LETTERS[tile.letter]?.points || null}
        size="game"
        cursor="pointer"
      />
    </Flex>
  );
};

export default observer(BoardField);
