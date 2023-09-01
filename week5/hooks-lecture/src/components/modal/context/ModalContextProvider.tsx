"use client";
import { useReducer, useContext, useRef } from "react";
import {
  ModalContext,
  ModalDispatchContext,
  modalReducer,
  IModalContext,
} from "@/components/modal/context/ModalContext";
import React from "react";
import Modal from "../Modal";

export function ModalContextProvier({ children }: { children: React.ReactNode }) {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const initialModalState: IModalContext = {
    title: "",
    content: [""],
    modalRef: modalRef,
  };
  const [state, dispatch] = useReducer(modalReducer, initialModalState);
  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalContext.Provider value={state}>
        {children}
        <Modal ref={modalRef} />
      </ModalContext.Provider>
    </ModalDispatchContext.Provider>
  );
}

export function useModalState() {
  const state = useContext(ModalContext);
  if (!state) throw new Error("ModalProvider not found");
  return state;
}
export function useModalDispatch() {
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) throw new Error("ModalDispatchProvider not found");
  return dispatch;
}
