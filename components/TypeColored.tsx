import { FC, PropsWithChildren } from "react";

const TypeColored: FC<PropsWithChildren<{ type?: string }>> = ({
  children,
  type,
}) => {
  const typeColors = {
    Normal: "white",
    Fire: "orange",
    Water: "blue",
    Grass: "lime",
    Poison: "#e9c",
    Ghost: "purple",
    Flying: "lightblue",
    Bug: "#cc4",
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
