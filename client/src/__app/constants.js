export const SERVER_URL = '127.0.0.1:5000';

export const LS_ID = 'user_id';

export const LETTERS = {
  a: { letter: 'a', points: 1 },
  ą: { letter: 'ą', points: 5 },
  b: { letter: 'b', points: 3 },
  c: { letter: 'c', points: 3 },
  ć: { letter: 'ć', points: 6 },
  d: { letter: 'd', points: 2 },
  e: { letter: 'e', points: 1 },
  ę: { letter: 'ę', points: 5 },
  f: { letter: 'f', points: 4 },
  g: { letter: 'g', points: 2 },
  h: { letter: 'h', points: 4 },
  i: { letter: 'i', points: 1 },
  j: { letter: 'j', points: 8 },
  k: { letter: 'k', points: 5 },
  l: { letter: 'l', points: 1 },
  ł: { letter: 'ł', points: 3 },
  m: { letter: 'm', points: 3 },
  n: { letter: 'n', points: 1 },
  o: { letter: 'o', points: 1 },
  ó: { letter: 'ó', points: 1 },
  p: { letter: 'p', points: 3 },
  q: { letter: 'q', points: 10 },
  r: { letter: 'r', points: 1 },
  s: { letter: 's', points: 1 },
  ś: { letter: 'ś', points: 5 },
  t: { letter: 't', points: 1 },
  u: { letter: 'u', points: 1 },
  v: { letter: 'v', points: 4 },
  w: { letter: 'w', points: 4 },
  x: { letter: 'x', points: 8 },
  y: { letter: 'y', points: 4 },
  z: { letter: 'z', points: 10 },
  ż: { letter: 'ż', points: 5 },
  ź: { letter: 'ź', points: 5 },
};

export const fieldsData = new Array(15)
  .fill('')
  .map(() => Array(15).fill({ letter: null, premium: null }));

const TWS = [
  [0, 0],
  [7, 0],
  [14, 0],
  [0, 7],
  [14, 7],
  [0, 14],
  [7, 14],
  [14, 14],
];

const DWS = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [1, 13],
  [2, 12],
  [3, 11],
  [4, 10],
  [13, 1],
  [12, 2],
  [11, 3],
  [10, 4],
  [13, 13],
  [12, 12],
  [11, 11],
  [10, 10],
];

const TLS = [
  [1, 5],
  [1, 9],
  [5, 1],
  [5, 5],
  [5, 9],
  [5, 13],
  [9, 1],
  [9, 5],
  [9, 9],
  [9, 13],
  [13, 5],
  [13, 9],
];

const DLS = [
  [0, 3],
  [0, 11],
  [2, 6],
  [2, 8],
  [3, 0],
  [3, 7],
  [3, 14],
  [6, 2],
  [6, 6],
  [6, 8],
  [6, 12],
  [7, 3],
  [7, 11],
  [8, 2],
  [8, 6],
  [8, 8],
  [8, 12],
  [11, 0],
  [11, 7],
  [11, 14],
  [12, 6],
  [12, 8],
  [14, 3],
  [14, 11],
];

TWS.forEach((cords) => {
  fieldsData[cords[0]][cords[1]] = {
    letter: '',
    premium: 'TWS',
  };
});

DWS.forEach((cords) => {
  fieldsData[cords[0]][cords[1]] = {
    letter: null,
    premium: 'DWS',
  };
});

TLS.forEach((cords) => {
  fieldsData[cords[0]][cords[1]] = {
    letter: null,
    premium: 'TLS',
  };
});

DLS.forEach((cords) => {
  fieldsData[cords[0]][cords[1]] = {
    letter: null,
    premium: 'DLS',
  };
});
