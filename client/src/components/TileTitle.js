import React from 'react';
import LetterTile from './LetterTile';
import { Flex } from '@chakra-ui/react';
import { LETTERS } from '../__app/constants';

const TileTitle = React.memo(({ title, size }) => {
  return (
    <Flex width="fit-content">
      {title
        .toLowerCase()
        .split('')
        .map((letter, idx) => (
          <LetterTile
            size={size}
            key={`${letter}_${idx}`}
            {...LETTERS[letter]}
            transform={`rotate(${((Math.random() * 100) % 12) - 6}deg)`}
            {...(idx !== title.length - 1 ? { mr: '5px' } : {})}
          />
        ))}
    </Flex>
  );
});

export default TileTitle;
