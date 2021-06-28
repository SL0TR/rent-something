import React from "react";

function ProductTable({ list }) {
  return (
    <table className="table">
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
          <tr key={el?.code}>
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
  );
}

export default ProductTable;
