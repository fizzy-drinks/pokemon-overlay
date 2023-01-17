import axios from "axios";
import { useState, useEffect } from "react";

export default function usePokedex(gameId: string) {
  const [pokedex, setPokedex] = useState<{ number: number; name: string }[]>(
    []
  );
  useEffect(() => {
    axios.get<string>(`/dataset/pokemon/${gameId}.csv`).then(({ data }) => {
      const dataset = data.split("\n").map((row) => row.split(","));
      const moves = dataset.map<{ number: number; name: string }>(
        ([number, name]) => {
          return {
            name,
            number: parseInt(number, 10),
          };
        }
      );
      setPokedex(moves);
    });
  }, [gameId]);

  return pokedex;
}
