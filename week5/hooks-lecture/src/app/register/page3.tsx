"use client";

import { useModalDispatch, useModalState } from "@/components/modal/context/ModalContextProvider";
import InputField from "@/components/register/InputField";
import React, { useRef, useState } from "react";

const REGIST_FORM_FIELD = [
  {
    id: "register_form_field_01",
    name: "email",
    type: "email",
    errorMessage: "유효한 이메일 주소가 아닙니다",
    placeholder: "이메일",
    label: "이메일",
    minLength: 5,
    required: true,
    pattern:
      "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])",
  },

  {
    id: "register_form_field_02",
    name: "password",
    type: "password",
    errorMessage: "최소 8자 특수문자 1개 영문 대소 문자를 하나 이상 포함해주세요",
    placeholder: "비밀번호",
    label: "비밀번호",
    required: true,
    minLength: 8,
    // prettier-ignore
    pattern: "^(?=.*[!@#\\$%\\^&\\*\\(\\)\\-\\+=\\{\\}\\[\\]\\|;:'\",.<>?\\/`~a-z])(?=.*[A-Z]).{8,}$",
  },
];

interface registerForm {
  email: string;
  password: string;
}
const initialUserValue = {
  email: "",
  password: "",
};

function page() {
  const inputFieldTargets = useRef<HTMLInputElement[] | null[]>([]);
  const [userValues, setUserValues] = useState<registerForm>(initialUserValue);
  const dispatch = useModalDispatch();
  const state = useModalState();
  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputFieldTargets.current !== null) {
      inputFieldTargets.current?.map((field) => {
        //setState는 비동기함수 바로 갱신되지 않는다
        setUserValues((prevUserValues) => ({
          ...prevUserValues,
          [field?.name as string]: field?.value,
        }));
      });
    }
    const invalidFieldName = inputFieldTargets.current?.filter((reference) => !reference?.validity?.valid);
    if (invalidFieldName.length > 0) {
      invalidFieldName[0]?.focus();
      let invalidNames = invalidFieldName.map((field) => field?.name);

      const errorMessages = REGIST_FORM_FIELD.map((field) => {
        if (invalidNames.includes(field.name)) {
          return field.errorMessage;
        }
      });

      dispatch({
        type: "SHOW",
        payload: { title: `${invalidNames.join(",")}`, content: errorMessages },
      });

      state.modalRef.current?.showModal();
    }
  };
  // console.log(userValues);
  return (
    <form className="flex flex-col gap-2 w-[400px] group" noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        {REGIST_FORM_FIELD.map((field, index) => (
          <InputField
            key={field.id}
            ref={(ref) => (inputFieldTargets.current[index] = ref)}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            pattern={field.pattern}
          />
        ))}
      </div>
      <button
        // className="w-full border border-1 border-gray-800 bg-slate-500 text-white hover:bg-slate-500/[0.8] group-invalid:pointer-events-none group-invalid:opacity-30"
        className="w-full border border-1 border-gray-800 bg-slate-500 text-white hover:bg-slate-500/[0.8]"
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
}

export default page;
