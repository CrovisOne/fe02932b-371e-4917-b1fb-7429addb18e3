import { ReactNode, forwardRef } from "react";
import { SummaryCardImage } from "./SummaryCardImage";
import { SummaryCardBody } from "./SummaryCardBody";

import "./summary-card.scss";

interface SummaryCardProps {
  children?: ReactNode;
}

const ForwardedSummaryCard = forwardRef<HTMLDivElement, SummaryCardProps>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="summary-card px-0 py-4 md:h-32 md:p-4">
        {children}
      </div>
    );
  },
);

export const SummaryCard = Object.assign(ForwardedSummaryCard, {
  Image: SummaryCardImage,
  Body: SummaryCardBody,
});
