import { Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const SIZES = {
  normal: {
    borderWidth: '5px',
    borderRadius: '15px',
    box: '90px',
    fontSize: '5xl',
    corner: '2',
    pointsSize: 'lg',
  },
  game: {
    borderWidth: '3px',
    borderRadius: '7px',
    box: '45px',
    fontSize: '2xl',
    corner: '1',
    pointsSize: 'sm',
  },
};

const LetterTile = ({ letter, points, onClick, size, ...rest }) => {
  const theme = useTheme();

  return (
    <Flex
      borderRadius={SIZES[size].borderRadius}
      p={`${SIZES[size].borderWidth} ${SIZES[size].borderWidth} 0 0`}
      background={theme.colors.tileBackground}
      position="relative"
      width={SIZES[size].box}
      height={SIZES[size].box}
      justifyContent="center"
      alignItems="center"
      onClick={() => (onClick ? onClick({ letter, points }) : null)}
      borderLeft={`${SIZES[size].borderWidth} solid ${theme.colors.tileBorder}`}
      borderBottom={`${SIZES[size].borderWidth} solid ${theme.colors.tileBorder}`}
      boxShadow="base"
      {...rest}
    >
      <Text fontSize={SIZES[size].fontSize} lineHeight="100%" fontWeight="bold">
        {letter.toUpperCase()}
      </Text>
      <Text
        position="absolute"
        lineHeight="100%"
        right={SIZES[size].corner}
        bottom={SIZES[size].corner}
        fontSize={SIZES[size].pointsSize}
      >
        {points}
      </Text>
    </Flex>
  );
};

LetterTile.defaultProps = {
  size: 'game',
};

export default LetterTile;
