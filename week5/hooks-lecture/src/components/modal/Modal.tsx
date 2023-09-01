"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { useModalState } from "@/components/modal/context/ModalContextProvider";

const Modal = forwardRef((_, ref: ForwardedRef<HTMLDialogElement>) => {
  const state = useModalState();
  const handleClose = (e: React.UIEvent<HTMLButtonElement>) => {
    e.preventDefault();
    state.modalRef.current?.close();
  };
  return (
    <dialog ref={ref} className="border border-1 border-gray-700">
      <div className="flex flex-col gap-2 p-4">
        <span className="text-lg">{state.title.toUpperCase()}</span>
        <ul className="flex flex-col">
          {state.content.map((content_item, index) => (
            <li key={index} className="text-base">
              {content_item}
            </li>
          ))}
        </ul>
        <div className="flex text-base justify-end gap-4">
          <button
            className="px-2 py-1 border border-1 border-gray-800 bg-slate-500 text-white hover:bg-slate-500/[0.8]"
            onClick={handleClose}
          >
            취소
          </button>
          <button
            className="px-2 py-1 border border-1 border-gray-800 bg-slate-500 text-white hover:bg-slate-500/[0.8]"
            onClick={handleClose}
          >
            확인
          </button>
        </div>
      </div>
    </dialog>
  );
});

export default Modal;
