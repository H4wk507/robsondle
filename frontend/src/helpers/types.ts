type Color = "green" | "yellow" | "black" | null;
export type TLetter = { value: string | null; color: Color };
export type TRow = TLetter[];
export type TGrid = TRow[];
export type FormData = {
  name: string;
  password: string;
};
