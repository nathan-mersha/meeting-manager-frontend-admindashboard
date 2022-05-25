import { atom } from "recoil";

export const handleDataState = atom({
  key: "handleDataState",
  default: false,
});

export const getDataState = atom({
  key: "getDataState",
  default: {},
});

export const useSSRDataState = atom({
  key: "useSSRDataState",
  default: true,
});