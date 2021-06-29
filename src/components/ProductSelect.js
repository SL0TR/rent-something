import { useStateContext } from "context/Context";
import useLocalStorage from "hooks/useLocalStorage";

function ProductSelect() {
  const { selectedItem, setSelectedItem } = useStateContext();
  const items = useLocalStorage();

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => setSelectedItem(items[e?.target?.value])}
    >
      {!selectedItem?.name && <option>Please select</option>}
      {items.map((el, i) => (
        <option key={el?.code} value={i}>
          {el?.name}
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;
