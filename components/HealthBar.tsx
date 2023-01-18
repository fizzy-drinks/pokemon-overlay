import getHpColor from "lib/helpers/getHpColor";
import { FC } from "react";

const HealthBar: FC<{ percent: number }> = ({ percent }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid white",
        borderRadius: "2px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${percent * 100}%`,
          backgroundColor: getHpColor(percent),
          height: "12px",
          transition: "all 300ms linear",
        }}
      />
    </div>
  );
};

export default HealthBar;
