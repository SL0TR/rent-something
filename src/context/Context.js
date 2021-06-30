import useLocalStorage from "hooks/useLocalStorage";
import { seedItems } from "lib/storage";
import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext();

export function useStateContext() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [allItems, setAllItems] = useLocalStorage("items", []);
  const [selectedItem, setSelectedItem] = useState();
  const [filteredItems, setFilteredItems] = useState([]);
  const [bookedItems, setBookedItems] = useLocalStorage("bookedItem", []);
  const [returnItem, setReturnItem] = useState();

  useEffect(() => {
    if (!allItems.length) {
      setAllItems(seedItems);
    }
  }, [allItems, setAllItems]);

  return (
    <Context.Provider
      value={{
        selectedItem,
        setSelectedItem,
        filteredItems,
        setFilteredItems,
        allItems,
        setAllItems,
        bookedItems,
        setBookedItems,
        returnItem,
        setReturnItem,
      }}
    >
      {children}
    </Context.Provider>
  );
};
