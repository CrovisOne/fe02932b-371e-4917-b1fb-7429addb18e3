import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Title } from "@radix-ui/react-toast";
import {
  CalendarIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react";
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
        <div className="mx-4 flex w-full flex-col gap-1">
          <div className="flex justify-between gap-2">
            <p className="line-clamp-1 overflow-hidden text-lg font-semibold">
              {title}
            </p>
            {topUtils}
          </div>
          <div className="flex items-center justify-between">
            <div>{description}</div>
            <div className="flex items-center gap-4">{bottomUtils}</div>
          </div>
        </div>
      )}
    </>
  );
}
