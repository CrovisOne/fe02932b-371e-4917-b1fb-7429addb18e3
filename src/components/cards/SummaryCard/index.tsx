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
      <div ref={ref} className="summary-card md:h-32">
        {children}
      </div>
    );
  },
);

export const SummaryCard = Object.assign(ForwardedSummaryCard, {
  Image: SummaryCardImage,
  Body: SummaryCardBody,
});
