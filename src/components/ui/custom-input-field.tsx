// components/ui/custom-input-field.tsx
"use client";

import {
  Controller,
  Control,
  FieldValues,
  Path,
  ControllerRenderProps,
  FieldPath,
} from "react-hook-form";
import {
  memo,
  ReactNode,
  useState,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import Image from "next/image";
import { Eye, EyeClosed } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormFieldType } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Option = string | { label: string; value: string };
type OptionArray = Option[] | readonly Option[];

interface CustomProps<T extends FieldValues> {
  control?: Control<T>;
  fieldType: FormFieldType;
  name: Path<T>;
  label?: ReactNode; // Changed from string to ReactNode
  placeholder?: string;
  disabled?: boolean;
  children?: ReactNode;
  icon?: ReactNode;
  options?: OptionArray;
  iconSrc?: string;
  iconAlt?: string;
  dateFormat?: string;
  showTimeSelect?: boolean;
  className?: string;
  renderSkeleton?: (field: ControllerRenderProps<T, FieldPath<T>>) => ReactNode;
  // New props for number input
  min?: number;
  max?: number;
  step?: number;
  // Additional props for direct input handling
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onKeyPress?: (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onBlur?: () => void;
}


interface RenderFieldProps<T extends FieldValues> {
  field?: ControllerRenderProps<T, FieldPath<T>>;
  props: CustomProps<T>;
}

const InputWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={cn(
      "border border-[#e5e5e5] dark:border-neutral-800 dark:bg-transparent px-4 rounded-[8px] h-[48px] overflow-hidden flex items-center gap-x-4 focus-within:border-[#10b981]",
      className
    )}
  >
    {children}
  </div>
);

const RenderField = <T extends FieldValues>({
  field,
  props,
}: RenderFieldProps<T>) => {
  const {
    fieldType,
    disabled,
    placeholder,
    options,
    className,
    icon,
    iconSrc,
    iconAlt,
    min,
    max,
    step,
    value: externalValue,
    onChange: externalOnChange,
    onKeyPress,
    onBlur: externalOnBlur,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const renderIcon = () =>
    typeof iconSrc === "string" ? (
      <Image src={iconSrc} height={24} width={24} alt={iconAlt || "icon"} />
    ) : (
      icon
    );

  // Common props for all input types
  const commonProps = {
    disabled,
    placeholder,
    className:
      "w-full h-full bg-transparent text-[#171717] dark:text-white text-[12px] placeholder:text-[#A3A3A3] dark:placeholder:text-neutral-400 placeholder:font-light outline-none",
  };

  // Handle controlled vs uncontrolled
  const getInputProps = () => {
    if (field) {
      return {
        ...field,
        ...commonProps,
      };
    }

    return {
      ...commonProps,
      value: externalValue,
      onChange: externalOnChange,
      onKeyPress,
      onBlur: externalOnBlur,
    };
  };

  const getTextareaProps = () => {
    const baseProps = getInputProps();
    return {
      ...baseProps,
      className:
        "w-full px-3 py-2 text-[12px] min-h-[9rem] border border-[#f5f5f5] md:border-[#e5e5e5] dark:border-neutral-800 rounded-lg bg-white dark:bg-transparent overflow-y-auto resize-none text-[#404040] dark:text-white placeholder:text-[#a3a3a3] dark:placeholder:text-neutral-400 placeholder:font-normal outline-none",
    };
  };

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <InputWrapper className={className}>
          <input {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.EMAIL:
      return (
        <InputWrapper className={className}>
          <input type="email" {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.PASSWORD:
      return (
        <InputWrapper className={className}>
          <input
            type={isPasswordVisible ? "text" : "password"}
            {...getInputProps()}
          />
          <button type="button" onClick={togglePasswordVisibility}>
            {isPasswordVisible ? (
              <Eye className="text-[#A3A3A3]" size={20} />
            ) : (
              <EyeClosed className="text-[#A3A3A3]" size={20} />
            )}
          </button>
        </InputWrapper>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <InputWrapper className={className}>
          <input type="tel" {...getInputProps()} />
        </InputWrapper>
      );

    case FormFieldType.NUMBER:
      return (
        <InputWrapper className={className}>
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            {...getInputProps()}
          />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.DATE:
      return (
        <InputWrapper className={className}>
          <input type="date" {...getInputProps()} />
          {renderIcon()}
        </InputWrapper>
      );

    case FormFieldType.TEXTAREA:
      return <textarea {...getTextareaProps()} />;

    case FormFieldType.SELECT:
      return (
        <InputWrapper className={className}>
          {field ? (
            <Select
              onValueChange={field.onChange}
              value={field.value || ""}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-none bg-none h-12 p-0 dark:border-neutral-800 rounded-lg text-left dark:bg-transparent focus:ring-0 focus:ring-none">
                <SelectValue
                  placeholder={placeholder || "Select an option..."}
                />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value =
                    typeof option === "string" ? option : option.value;
                  const label =
                    typeof option === "string" ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          ) : (
            <Select
              onValueChange={(value) => {
                if (externalOnChange) {
                  externalOnChange({ target: { value } } as any);
                }
              }}
              value={externalValue || ""}
              disabled={disabled}
            >
              <SelectTrigger className="w-full border-none bg-none h-12 p-0 dark:border-neutral-800 rounded-lg text-left dark:bg-transparent focus:ring-0 focus:ring-none">
                <SelectValue
                  placeholder={placeholder || "Select an option..."}
                />
              </SelectTrigger>
              <SelectContent>
                {options?.map((option) => {
                  const value =
                    typeof option === "string" ? option : option.value;
                  const label =
                    typeof option === "string" ? option : option.label;
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          )}
        </InputWrapper>
      );

    default:
      return null;
  }
};

const CustomFormField = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, fieldType, label, name } = props;

  return (
    <div className="flex flex-col gap-y-2">
      {fieldType !== FormFieldType.CHECKBOX && label && (
        <label className="text-sm md:text-base capitalize font-[500] text-[#344054] dark:text-white">
          {label}
        </label>
      )}

      {control ? (
        <Controller
          control={control}
          name={name}
          render={({ field, fieldState }) => (
            <>
              <RenderField field={field} props={props} />
              {fieldState.error && (
                <p className="text-sm font-normal text-red-400">
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      ) : (
        <RenderField props={props} />
      )}
    </div>
  );
};

export default memo(CustomFormField) as typeof CustomFormField;
