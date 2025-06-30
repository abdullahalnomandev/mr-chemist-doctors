import { Heart, MessageCircle, Scale, Stethoscope, Truck, User, UserRound, type LucideProps } from "lucide-react";

// Define all available icons
export const ICONS = {
  HEART: "heart",
  MESSAGE_CIRCLE: "message-circle",
  SCALE: "scale",
  STETHOSCOPE: "stethoscope",
  TRUCK: "truck",
  USER: "user",
  USER_ROUND: "user-round",
} as const;

// Type for icon names
export type IconName = (typeof ICONS)[keyof typeof ICONS];

// Function to get the icon component based on name
export function getIcon(name: IconName, props?: LucideProps): React.ReactElement {
  switch (name) {
    case ICONS.HEART:
      return <Heart {...props} />;
    case ICONS.MESSAGE_CIRCLE:
      return <MessageCircle {...props} />;
    case ICONS.SCALE:
      return <Scale {...props} />;
    case ICONS.STETHOSCOPE:
      return <Stethoscope {...props} />;
    case ICONS.TRUCK:
      return <Truck {...props} />;
    case ICONS.USER:
      return <User {...props} />;
    case ICONS.USER_ROUND:
      return <UserRound {...props} />;
    default:
      return <></>;
  }
}
