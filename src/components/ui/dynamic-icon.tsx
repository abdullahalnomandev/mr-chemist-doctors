import { type LucideProps } from "lucide-react";
import { IconName, getIcon } from "./icons";

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  return getIcon(name, props);
}
