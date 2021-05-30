import { Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const LetterTile = ({ letter, points, onClick, ...rest }) => {
  const theme = useTheme();

  return (
    <Flex
      borderRadius="15px"
      p="5px 5px 0 0"
      background={theme.colors.tileBackground}
      position="relative"
      width="90px"
      height="90px"
      justifyContent="center"
      alignItems="center"
      onClick={() => (onClick ? onClick({ letter, points }) : null)}
      borderLeft={`5px solid ${theme.colors.tileBorder}`}
      borderBottom={`5px solid ${theme.colors.tileBorder}`}
      boxShadow="base"
      {...rest}
    >
      <Text fontSize="5xl" lineHeight="100%" fontWeight="bold">
        {letter.toUpperCase()}
      </Text>
      <Text position="absolute" lineHeight="100%" right="2" bottom="2">
        {points}
      </Text>
    </Flex>
  );
};

export default LetterTile;
