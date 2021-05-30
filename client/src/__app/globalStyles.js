import { Global, css } from '@emotion/react';

const GlobalStyles = () => {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;900&display=swap');

        body {
          font-family: 'Cairo', sans-serif;
        }
      `}
    />
  );
};

export default GlobalStyles;
