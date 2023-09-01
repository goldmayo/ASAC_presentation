"use client";
import React from "react";
import { SubmitHandler, SubmitErrorHandler, useForm } from "react-hook-form";
import { useModalDispatch, useModalState } from "@/components/modal/context/ModalContextProvider";

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
const page = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting, errors },
  } = useForm<registerForm>({ defaultValues: { email: "", password: "" } });

  const state = useModalState();
  const dispatch = useModalDispatch();

  const onSubmitHandler: SubmitHandler<registerForm> = async (data) => {
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const onSubmitErrorHandler: SubmitErrorHandler<registerForm> = (errors) => {
    const invalidFieldNames = Object.keys(errors);
    const errorMessages = Object.values(errors).map((el) => el.message);

    dispatch({
      type: "SHOW",
      payload: {
        title: `${invalidFieldNames.join(",")}`,
        content: errorMessages,
      },
    });
    state.modalRef.current?.showModal();
  };
  // handleSubmit은 유효성 검사가 통과되어야만 실행된다.
  return (
    <form className="flex flex-col" noValidate onSubmit={handleSubmit(onSubmitHandler, onSubmitErrorHandler)}>
      <label htmlFor="email">이메일</label>
      <input
        id="email"
        placeholder="이메일"
        autoComplete="on"
        type="email"
        {...register("email", {
          required: { value: true, message: "이메일은 필수 입력입니다" },
          minLength: 5,
          pattern: {
            value:
              /([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])/,
            message: "유효한 이메일 주소가 아닙니다",
          },
        })}
      />
      <label htmlFor="password">비밀번호</label>
      <input
        id="password"
        placeholder="********"
        autoComplete="off"
        type="password"
        {...register("password", {
          required: { value: true, message: "비밀번호는 필수 입력입니다" },
          minLength: 8,
          pattern: {
            value: /^(?=.*[!@#$%^&*()-+={}[]|;:'",.<>?\/`~a-z])(?=.*[A-Z]).{8,}$/,
            message: "최소 8자 특수문자 1개 영문 대소 문자를 하나 이상 포함해주세요",
          },
        })}
      />
      <button type="submit" disabled={isSubmitting}>
        로그인
      </button>
    </form>
  );
};

export default page;
