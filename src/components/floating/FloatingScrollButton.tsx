import { ArrowUpToLineIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

export function FloatingScrollButton(): JSX.Element {
  const [scrolled, setScrolled] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const onScroll = () => {
      const scrollValue = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollValue > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`${
        scrolled ? "scale-100" : "scale-0"
      } fixed bottom-6 right-6 transition-all`}
    >
      <Button onClick={scrollToTop} variant={"secondary"} size={"icon"}>
        <ArrowUpToLineIcon />
      </Button>
    </div>
  );
}
