import { ReactNode, forwardRef } from "react";
import { SummaryCardImage } from "./SummaryCardImage";
import { SummaryCardBody } from "./SummaryCardBody";

interface SummaryCardProps {
  children?: ReactNode;
}

const ForwardedSummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="flex h-32 bg-white py-4 shadow-sm">
        {children}
      </div>
    );
  },
);

export const SummaryCard = Object.assign(ForwardedSummaryCard, {
  Image: SummaryCardImage,
  Body: SummaryCardBody,
});
