import { useStateContext } from "context/Context";

function ProductTable({ list }) {
  const { selectedIndex, setSelectedIndex } = useStateContext();

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
              className={i === selectedIndex ? "table-active" : null}
              key={el?.code}
              onClick={() => setSelectedIndex(i)}
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
      {selectedIndex !== undefined && (
        <div class="alert alert-primary" role="alert">
          <p>Selected Item: {list[selectedIndex]?.name}</p>
        </div>
      )}
    </>
  );
}

export default ProductTable;
