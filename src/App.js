import { useState } from "react";
import "./App.css";
import ProductTable from "components/ProductTable";
import Search from "components/Search";
import useLocalStorage from "hooks/useLocalStorage";

function App() {
  const items = useLocalStorage();
  const [filteredItems, setFilteredItems] = useState([]);

  return (
    <div className="container py-5">
      <div className="row">
        <Search setFilteredItems={setFilteredItems} items={items} />
        <ProductTable list={filteredItems} />
      </div>
    </div>
  );
}

export default App;
