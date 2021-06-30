import { useStateContext } from "context/Context";

function ProductSelect() {
  const { selectedItem, setSelectedItem, allItems } = useStateContext();

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => setSelectedItem(allItems[e?.target?.value])}
    >
      {!selectedItem?.name && <option>Please select</option>}
      {allItems.map((el, i) => (
        <option key={el?.code} value={i}>
          {el?.name}
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;
