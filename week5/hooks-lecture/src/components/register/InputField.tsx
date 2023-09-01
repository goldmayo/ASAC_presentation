"use client";
import React, { FC, ForwardedRef, forwardRef, useState } from "react";

// const inputFieldTargets = useRef<{ name: string; ref: HTMLInputElement }[]>([]);
// ref={(ref) => inputFieldTargets.current.push({ name: "email", ref: ref as HTMLInputElement })}
// ref={(ref) => inputFieldTargets.current.push({ name: "password", ref: ref as HTMLInputElement })}

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  required: boolean;
  pattern: string;
}

const InputField = forwardRef((props: InputFieldProps, ref: ForwardedRef<HTMLInputElement>) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsFocused(true);
  };
  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.preventDefault();
    setIsFocused(false);
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={props.name}>{props.label}</label>
      <input
        ref={ref}
        name={props.name}
        type={props.type}
        pattern={props.pattern}
        required={props.required}
        placeholder={props.placeholder}
        autoComplete="on"
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="border-b-2 border-gray-800 invalid:[&:not(:placeholder-shown):not(:focus)]:bg-red-200 invalid:[&:not(:placeholder-shown):focus]:outline-red-500 invalid:[&:not(:placeholder-shown):focus]:bg-red-100 valid:outline-green-500 valid:border-green-500 valid:bg-green-100"
      />
    </div>
  );
});

export default InputField;
