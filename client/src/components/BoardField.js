import { Flex, Text } from '@chakra-ui/react';
import { useTheme } from '@chakra-ui/system';

const STYLES = {
  normalField: {
    borderRadius: '7px',
    box: '60px',
    fontSize: '11px',
    corner: '1',
    pointstype: 'sm',
    margin: '2px',
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

const BoardField = ({ premium, text, points, onClick, type, ...rest }) => {
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
      margin={STYLES[type].margin}
      onClick={() => (onClick ? onClick({ text, points }) : null)}
      borderLeft={`${STYLES[type].borderWidth} solid ${theme.colors.tileBorder}`}
      boxShadow="base"
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
      <Text
        position="absolute"
        lineHeight="100%"
        right={STYLES[type].corner}
        bottom={STYLES[type].corner}
        fonttype={STYLES[type].pointstype}
      >
        {points}
      </Text>
    </Flex>
  );
};

export default BoardField;
