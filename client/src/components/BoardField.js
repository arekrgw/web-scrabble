import { Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const STYLES = {
  normalField: {
    borderRadius: '7px',
    box: 'calc((100vh - 100px - 28px) / 15)', // 100px for header/podstawke/legende na klocki, 28px gap w gridzie, 15 ilosc klockow
    fontSize: '11px',
    corner: '1',
    pointstype: 'sm',
  },
  TWS: {
    background: '#ff4d4d',
  },
  DWS: {
    background: '#F5C134',
  },
  TLS: {
    background: '#347AF5',
  },
  DLS: {
    background: '#6DA3F5',
  },
};

const BoardField = ({ premium, text, onClick, type, ...rest }) => {
  const theme = useTheme();

  return (
    <Flex
      borderRadius={STYLES[type].borderRadius}
      p={`${STYLES[type].borderWidth} ${STYLES[type].borderWidth} 0 0`}
      background={
        premium == null
          ? theme.colors.tileBackground
          : STYLES[premium].background
      }
      position="relative"
      width={STYLES[type].box}
      height={STYLES[type].box}
      justifyContent="center"
      alignItems="center"
      onClick={() => (onClick ? onClick({ text }) : null)}
      {...rest}
    >
      <Text
        fontSize={STYLES[type].fontSize}
        lineHeight="100%"
        fontWeight="bold"
        align="center"
      >
        {text && text.toUpperCase()}
      </Text>
    </Flex>
  );
};

export default BoardField;
