import { useStateContext } from "context/Context";

function ProductTable({ list }) {
  const { selectedItem, setSelectedItem } = useStateContext();

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
            <th scope="col">Mileage</th>
          </tr>
        </thead>
        <tbody>
          {list.map((el, i) => (
            <tr
              style={{ cursor: "pointer" }}
              className={
                el?.code === selectedItem?.code ? "table-active" : null
              }
              key={el?.code}
              onClick={() => setSelectedItem(el)}
            >
              <th scope="row">{i + 1}</th>
              <td>{el?.name}</td>
              <td>{el?.code}</td>
              <td>{el?.needing_repair ? "Yes" : "No"}</td>
              <td>{`${el?.durability} / ${el?.max_durability}`}</td>
              <td>{el?.mileage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedItem && (
        <div class="alert alert-primary" role="alert">
          <strong> Selected Item: </strong>
          {selectedItem?.name}
        </div>
      )}
    </>
  );
}

export default ProductTable;
