import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  ReactNode,
} from "react";
import { C_BORDER, C_TEXT } from "./tokens";

type RequireName<T extends { name?: string }> = Omit<T, "name"> & { name: string };

export type InputProps = RequireName<InputHTMLAttributes<HTMLInputElement>> & {
  label?: string;
};

export type TextareaProps = RequireName<TextareaHTMLAttributes<HTMLTextAreaElement>> & {
  label?: string;
};

export type SelectProps = RequireName<SelectHTMLAttributes<HTMLSelectElement>> & {
  label?: string;
  children?: ReactNode;
};

export const Input = ({ label, name, ...props }: InputProps) => (
  <label className="block text-sm">
    {label && (
      <span className="mb-1 block" style={{ color: C_TEXT }}>
        {label}
      </span>
    )}
    <input
      name={name}
      className="w-full rounded-xl border bg-white px-3 py-2 outline-none placeholder:opacity-70 focus:outline-none focus:border-[#3077E8] focus:ring-2 focus:ring-[#3077E8]/40 focus:ring-offset-0 transition-shadow"
      style={{ borderColor: C_BORDER }}
      {...props}
    />
  </label>
);

export const Textarea = ({ label, name, ...props }: TextareaProps) => (
  <label className="block text-sm">
    {label && (
      <span className="mb-1 block" style={{ color: C_TEXT }}>
        {label}
      </span>
    )}
    <textarea
      name={name}
      className="w-full min-h-[120px] resize-vertical rounded-xl border bg-white px-3 py-2 outline-none focus:outline-none focus:border-[#3077E8] focus:ring-2 focus:ring-[#3077E8]/40 focus:ring-offset-0 transition-shadow"
      style={{ borderColor: C_BORDER }}
      {...props}
    />
  </label>
);

export const Select = ({ label, name, children, ...props }: SelectProps) => (
  <label className="block text-sm">
    {label && (
      <span className="mb-1 block" style={{ color: C_TEXT }}>
        {label}
      </span>
    )}
    <select
      name={name}
      className="w-full rounded-xl border bg-white px-3 py-2 outline-none focus:outline-none focus:border-[#3077E8] focus:ring-2 focus:ring-[#3077E8]/40 focus:ring-offset-0 transition-shadow"
      style={{ borderColor: C_BORDER }}
      {...props}
    >
      {children}
    </select>
  </label>
);
