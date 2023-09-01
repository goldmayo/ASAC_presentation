"use client";
import { createContext, Dispatch, MutableRefObject } from "react";

export interface IModalContext {
  title: string;
  content: string[];
  modalRef: React.MutableRefObject<HTMLDialogElement | null>;
}

export const ModalContext = createContext<IModalContext | null>(null);
export type ModalActionsType = "SHOW" | "CLOSE";
export type ModalActions = { type: ModalActionsType; payload?: any };

export type ModalDispatch = Dispatch<ModalActions>;

export const ModalDispatchContext = createContext<ModalDispatch | undefined>(undefined);

export const modalReducer = (state: IModalContext, action: ModalActions): IModalContext => {
  console.log(action.type);

  switch (action.type) {
    case "SHOW":
      return {
        ...state,
        title: action.payload.title,
        content: [...action.payload.content],
      };
    case "CLOSE":
      return {
        ...state,
        title: "",
        content: [""],
      };
    default:
      throw new Error("unexpected action");
  }
};
