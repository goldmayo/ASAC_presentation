"use client";

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  type: string;
  errorMessage: string;
  placeholder: string;
  label: string;
  minLength?: number;
  required: boolean;
  pattern: string;
}
import React, { FC } from "react";

const FormField: FC<FormFieldProps> = (props) => {
  return (
    <div className="flex flex-col">
      <label className="text-black" htmlFor={props.label}>
        {props.name}
      </label>
      <input
        className="w-full border border-1 border-gray-800 text-black px-2 py-1 invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-500 peer"
        name={props.name}
        type={props.type}
        value={props.value}
        minLength={props.minLength}
        required={props.required}
        pattern={props.pattern}
        placeholder={props.placeholder}
        onChange={props.onChange}
        autoComplete="on"
      />
      <span className="mt-2 hidden text-red-500 text-sm  peer-[&:not(:placeholder-shown):not(:focus):invalid]:block ">
        {props.errorMessage}
      </span>
    </div>
  );
};

export default FormField;
