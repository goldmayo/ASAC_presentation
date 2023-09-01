"use client";

import FormField from "@/components/register/FormField";
import React, { useRef, useState } from "react";

// email regex: https://sisiblog.tistory.com/244
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
  const formRef = useRef<HTMLFormElement>(null);
  const [userValues, setUserValues] = useState<registerForm>(initialUserValue);
  const [inputFieldValid, setInputFieldValid] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.currentTarget;
    setUserValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formRef);

    // formRef.current?.map((inputfield: HTMLInputElement) => {
    //   setInputFieldValid((prev) => ({
    //     ...prev,
    //     [inputfield.name]: inputfield.validity.valid,
    //   }));
    // });
    console.log(formRef.current?.children);
    console.log(userValues);
    console.log(inputFieldValid);
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setUserValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <form className="flex flex-col gap-2 w-[400px] group" ref={formRef} noValidate onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2">
        {REGIST_FORM_FIELD.map((field) => (
          <FormField
            key={field.id}
            name={field.name}
            label={field.label}
            errorMessage={field.errorMessage}
            type={field.type}
            placeholder={field.placeholder}
            required={field.required}
            pattern={field.pattern}
            onChange={handleChange}
            onInput={handleInput}
          />
        ))}
      </div>
      <button
        className="w-full border border-1 border-gray-800 bg-slate-500 text-white hover:bg-slate-500/[0.8] group-invalid:pointer-events-none group-invalid:opacity-30"
        type="submit"
      >
        회원가입
      </button>
    </form>
  );
}

export default page;
