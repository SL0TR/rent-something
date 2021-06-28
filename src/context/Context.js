import React, { useContext, useState } from "react";

const Context = React.createContext();

export function useStateContext() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [selectedItem, setSelectedItem] = useState();
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <Context.Provider
      value={{
        selectedItem,
        setSelectedItem,
        filteredItems,
        setFilteredItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};
