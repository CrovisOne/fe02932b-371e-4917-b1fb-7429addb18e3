import "./StickyBar.scss";

export function StickyBar(): JSX.Element {
  return (
    <div className="bar top-16 p-4 backdrop-blur-xl">
      <p className="text">I'm sticky!</p>
    </div>
  );
}
