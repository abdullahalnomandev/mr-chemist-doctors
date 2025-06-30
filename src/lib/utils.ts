import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TObject } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export const formatError = (error: unknown) => {
  let message = "something went wrong";
  if (error instanceof Error) message = error.message;
  return message;
};

export const removeEmptyProperties = <T>(payload: TObject<T>) => {
  return Object.entries(payload).reduce((acc: TObject<T>, [key, value]) => {
    if (value) acc[key] = value;
    return acc;
  }, {});
};

export const makeUrlSearchParam = (args: TObject) => {
  const refinedArgs = removeEmptyProperties(args);
  const searchParams = new URLSearchParams(refinedArgs).toString();
  return searchParams ? `?${searchParams}` : ``;
};
