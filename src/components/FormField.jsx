import React from "react";

const FormField = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value,
  handleChange,
  children,
}) => {
  return (
    <label htmlFor="" className="flex-1 w-full flex flex-col gap-3">
      {labelName && (
        <span className="font-epilogue font-semibold text-[14px] text-accent leading-[22px] mb-[10px]">
          {labelName}
        </span>
      )}

      {isTextArea ? (
        <textarea
          required
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="py-4 sm:px-4 px-3 outline-none border-[1px] border-primary bg-transparent font-epilogue text-accent text-[14px] placeholder:text-secondary rounded-[15px]"
        />
      ) : inputType === "date" ? (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-4 sm:px-4 px-3 outline-none border-[1px] border-primary bg-transparent font-epilogue text-accent text-[14px] placeholder:text-secondary rounded-[15px]"
        />
      ) : inputType === "select" ? (
        <select
          required
          value={value}
          onChange={handleChange}
          className="py-4 sm:px-4 px-3 outline-none border-[1px] border-primary bg-transparent font-epilogue text-accent text-[14px] placeholder:text-secondary rounded-[15px]"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {children}
        </select>
      ) : (
        <input
          required
          value={value}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="py-4 sm:px-4 px-3 outline-none border-[1px] border-primary bg-transparent font-epilogue text-accent text-[14px] placeholder:text-secondary rounded-[15px]"
        />
      )}
    </label>
  );
};

export default FormField;
