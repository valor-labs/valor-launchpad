import dayjs from 'dayjs';

type SearchTableQuery = (src: string, searchTxt: string) => boolean;

export const likeQuery: SearchTableQuery = (src, searchTxt) => {
  return src.toLowerCase().includes(searchTxt.toLowerCase());
};

export const equalsQuery: SearchTableQuery = (src, searchTxt) =>
  src === searchTxt;

export const dateEqualsQuery: SearchTableQuery = (src, searchTxt) => {
  return dayjs(src).isSame(searchTxt);
};
