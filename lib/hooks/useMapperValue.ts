import axios from "axios";
import { useState, useEffect } from "react";

async function getValueFromMapper(path: string) {
  const { data } = await axios.get(
    "http://localhost:8085/mapper/properties/" + path
  );
  return data.value;
}

export default function useMapperValue<T>(path: string) {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const i = setInterval(
      async () => setValue(await getValueFromMapper(path)),
      1000
    );
    return () => {
      typeof window !== "undefined" && clearInterval(i);
    };
  }, [path]);

  return value;
}
