import { ReactNode, useEffect, useState } from "react";

interface LazyLoaderProps {
  items: any[];
  renderRow: (item: any, index: number) => ReactNode;
  initialCount: number;
  increment: number;
  updateElementRefs?: (newCount: number) => void;
}

export function LazyLoader({
  items,
  renderRow,
  initialCount,
  increment,
  updateElementRefs,
}: LazyLoaderProps): JSX.Element {
  const [visibleCount, setVisibleCount] = useState(initialCount);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const totalHeight = document.documentElement.scrollHeight;

      const reached = scrollPosition >= totalHeight * 0.8;

      if (reached) {
        setVisibleCount((prev) => {
          const newCount = prev + increment;
          if (updateElementRefs) updateElementRefs(newCount);

          return newCount;
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <>{items.slice(0, visibleCount).map(renderRow)}</>;
}
