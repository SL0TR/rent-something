import { useStateContext } from "context/Context";
// import { getSelectedItem } from "lib/utils";

function ProductTable() {
  const { selectedItem, filteredItems } = useStateContext();

  // function handleItemSelect(obj, index) {
  //   const newItem = getSelectedItem(obj, index);
  //   setSelectedItem(newItem);
  // }

  return (
    <>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Code</th>
            <th scope="col">Need to Repair</th>
            <th scope="col">Durability</th>
            <th scope="col">Avaibility</th>
            <th scope="col">Mileage</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((el, i) => (
            <tr
              style={{ cursor: "pointer" }}
              className={
                el?.code === selectedItem?.code ? "table-active" : null
              }
              key={el?.code}
              // onClick={() => handleItemSelect(el, i)}
            >
              <th scope="row">{i + 1}</th>
              <td>{el?.name}</td>
              <td>{el?.code}</td>
              <td>{el?.needing_repair ? "Yes" : "No"}</td>
              <td>{`${el?.durability} / ${el?.max_durability}`}</td>
              <td>{el?.availability ? "Yes" : "No"}</td>
              <td>{el?.mileage ? el?.mileage : 0}</td>
              <td>${el?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* {selectedItem && (
        <div className="alert alert-primary" role="alert">
          <strong> Selected Item: </strong>
          {selectedItem?.name}
        </div>
      )} */}
    </>
  );
}

export default ProductTable;
