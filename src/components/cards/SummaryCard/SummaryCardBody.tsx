import { ReactNode } from "react";

interface SummaryCardBodyProps {
  title: string;
  topUtils?: ReactNode;
  description?: ReactNode;
  bottomUtils?: ReactNode;
  children?: ReactNode;
}

export function SummaryCardBody({
  title,
  topUtils,
  description,
  bottomUtils,
  children,
}: SummaryCardBodyProps): JSX.Element {
  return (
    <>
      {children ? (
        children
      ) : (
        <div className="summary-card-body">
          <div className="header flex">
            <p className="title">{title}</p>
            {topUtils}
          </div>
          <div className="footer flex-col md:flex-row ">
            <div>{description}</div>
            <div className="bottom-utils">{bottomUtils}</div>
          </div>
        </div>
      )}
    </>
  );
}
