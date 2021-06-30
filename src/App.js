import { ProductTable, Search, ReturnProduct, BookProduct } from "components";

function App() {
  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <Search />
        </div>
        <div className="col-12">
          <ProductTable />
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
