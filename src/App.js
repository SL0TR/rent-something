import { ProductTable, Search, ReturnProduct, BookProduct } from "components";
import useLocalStorage from "hooks/useLocalStorage";
import "./App.css";
import { useStateContext } from "context/Context";

function App() {
  const items = useLocalStorage();
  const { filteredItems, setFilteredItems } = useStateContext();

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <Search setFilteredItems={setFilteredItems} items={items} />
        </div>
        <div className="col-12">
          <ProductTable list={filteredItems} />
        </div>
        <div className="row justify-content-end">
          <div className="col-auto">
            <BookProduct />
          </div>
          <div className="col-auto">
            <ReturnProduct />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
