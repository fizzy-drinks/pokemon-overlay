import { FC, PropsWithChildren } from "react";

const TypeBadge: FC<PropsWithChildren<{ type?: string }>> = ({
  children,
  type,
}) => {
  const typeColors = {
    Normal: "salmon",
    Fire: "orange",
    Water: "blue",
    Grass: "green",
    Poison: "purple",
    Ghost: "purple",
    Flying: "silver",
    Bug: "#aa0",
    Ground: "#960",
    Rock: "#a96",
  };

  return (
    <span
      style={{
        backgroundColor:
          typeColors[
            type || (typeof children === "string" ? children : "Normal")
          ],
        padding: "0 5px",
        borderRadius: "3px",
        border: "1px solid white",
        width: "60px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </span>
  );
};

export default TypeBadge;
