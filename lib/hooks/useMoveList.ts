import axios from "axios";
import Move from "lib/types/Move";
import { useState, useEffect } from "react";

export default function useMoveList(gameId: string) {
  const [movelist, setMovelist] = useState<Move[]>([]);
  useEffect(() => {
    axios.get<string>(`/dataset/moves/${gameId}.csv`).then(({ data }) => {
      const dataset = data.split("\n").map((row) => row.split("|"));
      const moves = dataset.map<Move>(
        ([name, desc, moveType, ppString, powerString, accString]) => {
          return {
            name,
            desc,
            type: moveType,
            pp: parseInt(ppString, 10),
            pwr: parseInt(powerString, 10) || null,
            acc: parseInt(accString, 10) || null,
          };
        }
      );
      setMovelist(moves);
    });
  }, [gameId]);

  return movelist;
}
