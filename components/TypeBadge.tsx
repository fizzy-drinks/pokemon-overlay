import { FC, PropsWithChildren } from "react";

const TypeBadge: FC<PropsWithChildren<{ type?: string }>> = ({
  children,
  type,
}) => {
  const typeColors = {
    Normal: "salmon",
    Fire: "orange",
    Water: "#06a",
    Grass: "green",
    Poison: "#939",
    Ghost: "#606",
    Flying: "#66a",
    Bug: "#aa0",
    Ground: "#960",
    Rock: "#a96",
    Electric: "#ec0",
    Psychic: "#c0c",
    Ice: "#39a",
    Fighting: "#900",
    Dragon: "#03a",
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
        width: "80px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        textShadow: "#000 0 0 1px 1px",
      }}
    >
      {children}
    </span>
  );
};

export default TypeBadge;
