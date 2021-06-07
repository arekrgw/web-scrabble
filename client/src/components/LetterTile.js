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
  sheet: {
    borderWidth: '5px',
    borderRadius: '15px',
    box: '60px',
    fontSize: '3xl',
    corner: '2',
    pointsSize: 'md',
  },
  game: {
    borderWidth: '3px',
    borderRadius: '7px',
    corner: '3px',
  },
};

const PREMIUM = {
  TWS: {
    background: '#ff4d4d',
    border: '#892a2a',
  },
  DWS: {
    background: '#F5C134',
    border: '#896d1f',
  },
  TLS: {
    background: '#347AF5',
    border: '#1f4382',
  },
  DLS: {
    background: '#6DA3F5',
    border: '#3c5a87',
  },
};

const LetterTile = ({
  letter,
  points,
  premium,
  onClick,
  size,
  responsiveBox,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Flex
      borderRadius={SIZES[size].borderRadius}
      p={`${SIZES[size].borderWidth} ${SIZES[size].borderWidth} 0 0`}
      background={
        premium
          ? PREMIUM[premium].background
          : letter && points
          ? theme.colors.tileBackground
          : theme.colors.blankTileBackground
      }
      position="relative"
      width={SIZES[size].box || responsiveBox}
      height={SIZES[size].box || responsiveBox}
      justifyContent="center"
      alignItems="center"
      borderLeft={`${SIZES[size].borderWidth} solid ${
        letter && points
          ? premium
            ? PREMIUM[premium].border
            : theme.colors.tileBorder
          : premium
          ? PREMIUM[premium].background
          : theme.colors.blankTileBorder
      }`}
      borderBottom={`${SIZES[size].borderWidth} solid ${
        letter && points
          ? premium
            ? PREMIUM[premium].border
            : theme.colors.tileBorder
          : premium
          ? PREMIUM[premium].background
          : theme.colors.blankTileBorder
      }`}
      boxShadow="base"
      {...rest}
    >
      {letter && points && (
        <>
          <Text
            fontSize={SIZES[size].fontSize || `calc(${responsiveBox} * 0.6)`}
            lineHeight="100%"
            fontWeight="bold"
            align="center"
          >
            {letter && letter.toUpperCase()}
          </Text>
          <Text
            position="absolute"
            lineHeight="100%"
            right={SIZES[size].corner}
            bottom={SIZES[size].corner}
            fontSize={SIZES[size].pointsSize || `calc(${responsiveBox} * 0.34)`}
          >
            {points}
          </Text>
        </>
      )}
    </Flex>
  );
};

LetterTile.defaultProps = {
  size: 'game',
};

export default LetterTile;
