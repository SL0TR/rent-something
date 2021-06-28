import { useEffect, useState } from "react";
import { getDataFromLocalstorage, setDataToLocalstorage } from "lib/storage";

function useLocalStorage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!getDataFromLocalstorage()) {
      setDataToLocalstorage();
    } else {
      const localItems = JSON.parse(getDataFromLocalstorage());
      setItems(localItems);
    }
  }, []);

  return items;
}

export default useLocalStorage;
