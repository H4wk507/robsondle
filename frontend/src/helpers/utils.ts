import { NLETTERS, NROWS } from "./constants";
import { TLetter, TRow } from "./types";

export const getEmptyGrid = () =>
  new Array<TRow>(NROWS)
    .fill([])
    .map(() => new Array<TLetter>(NLETTERS).fill({ value: null, color: null }));
