import { ReactNode, forwardRef } from "react";
import TinyCardContext from "./TinyCardContext";
import { TinyCardImage } from "./TinyCardImage";
import { TinyCardBody } from "./TinyCardBody";

import "./TinyCard.scss";

export interface TinyCardProps {
  id: string | number;
  children?: ReactNode;
  className?: string;
  focused?: boolean;
  [prop: string]: any;
}

const ForwardedTinyCard = forwardRef<HTMLDivElement, TinyCardProps>(
  ({ id, children, className, focused = false, ...props }, ref) => {
    return (
      <TinyCardContext.Provider value={{ id }}>
        <div
          ref={ref}
          {...props}
          className={`tiny-card ${focused ? "focused" : ""}`}
        >
          {children}
        </div>
      </TinyCardContext.Provider>
    );
  },
);

export const TinyCard = Object.assign(ForwardedTinyCard, {
  Image: TinyCardImage,
  Body: TinyCardBody,
});
