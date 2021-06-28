import React, { useContext, useState } from "react";

const Context = React.createContext();

export function useStateContext() {
  return useContext(Context);
}

export const ContextProvider = ({ children }) => {
  const [selectedIndex, setSelectedIndex] = useState();
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <Context.Provider
      value={{
        selectedIndex,
        setSelectedIndex,
        filteredItems,
        setFilteredItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};
