interface PickDescriptionProps {
  description?: string;
}

export function PickDescription({
  description,
}: PickDescriptionProps): JSX.Element {
  return (
    <>{description ? <p className="description">{description}</p> : null}</>
  );
}
