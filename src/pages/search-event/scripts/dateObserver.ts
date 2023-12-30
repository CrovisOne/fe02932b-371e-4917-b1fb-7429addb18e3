/**
 * Observes the list of cards and updates the current smallest date of the visible elements
 *
 * @param cardRefs Array of card references which will be observed
 * @param setCurrentDate Function which is triggered when the state of visible cards changes
 * @returns A cleanup function
 */
export const observeCards = (
  cardRefs: (HTMLDivElement | null)[],
  setCurrentDate: (date: string | null) => void,
) => {
  let visibleEntries: IntersectionObserverEntry[] = [];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleEntries.push(entry);
        } else {
          visibleEntries = visibleEntries.filter(
            (e) => e.target !== entry.target,
          );
        }

        // Check for the earliest date of the visible cards
        if (visibleEntries.length > 0) {
          const earliestEntry = visibleEntries.reduce((earliest, current) => {
            return new Date(earliest.target.getAttribute("data-date") || "") <
              new Date(current.target.getAttribute("data-date") || "")
              ? earliest
              : current;
          });

          setCurrentDate(earliestEntry.target.getAttribute("data-date"));
        }
      });
    },
    { threshold: 0.1 },
  );

  cardRefs.forEach((ref) => ref && observer.observe(ref));

  // Cleanup
  return () => {
    cardRefs.forEach((ref) => ref && observer.unobserve(ref));
  };
};
