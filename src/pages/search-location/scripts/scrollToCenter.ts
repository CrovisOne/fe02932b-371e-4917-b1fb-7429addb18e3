export function scrollToCenter(
  scrollContainer: HTMLDivElement | null,
  id: string,
) {
  if (scrollContainer) {
    const clickedOnCard = scrollContainer.querySelector(
      `[data-id='${id}']`,
    ) as HTMLElement;
    clickedOnCard?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }
}
