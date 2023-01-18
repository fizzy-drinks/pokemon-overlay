import { FC, PropsWithChildren } from "react";

const TypeColored: FC<PropsWithChildren<{ type?: string }>> = ({
  children,
  type,
}) => {
  const typeColors = {
    Normal: "white",
    Fire: "orange",
    Water: "#09c",
    Grass: "lime",
    Poison: "#e9c",
    Ghost: "#cac",
    Flying: "lightblue",
    Bug: "#cc4",
    Ground: "#960",
    Rock: "#a96",
    Electric: "#ec0",
    Psychic: "#c0c",
    Ice: "#adf",
    Fighting: "#f33",
    Dragon: "#06a",
  };

  return (
    <span
      style={{
        color:
          typeColors[
            type || (typeof children === "string" ? children : "Normal")
          ],
      }}
    >
      {children}
    </span>
  );
};

export default TypeColored;
