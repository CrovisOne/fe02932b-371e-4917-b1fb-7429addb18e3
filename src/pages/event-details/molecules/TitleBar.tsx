import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TitleBarProps {
  title: string;
}

export function TitleBar({ title }: TitleBarProps): JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="title-box">
      <h3>{title}</h3>
      <Button
        variant={"secondary"}
        className="back-button hidden lg:block"
        onClick={goBack}
      >
        <ArrowLeftIcon />
      </Button>
    </div>
  );
}
