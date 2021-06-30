import { useStateContext } from "context/Context";
import { getSelectedItem } from "lib/utils";

function ProductSelect({ type = "book" }) {
  const { selectedItem, setSelectedItem, allItems, bookedItems } =
    useStateContext();
  const availableItems = allItems.filter((el) => el.availability === true);
  const isBooking = type === "book";
  const list = isBooking ? availableItems : bookedItems;

  function handleItemSelect(index) {
    const newItem = getSelectedItem(list[index], index);
    setSelectedItem(newItem);
  }

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => handleItemSelect(+e?.target?.value)}
      value={selectedItem?.index || ""}
    >
      {!selectedItem?.code && <option>Please select</option>}
      {list.map((el, i) => (
        <option key={el?.code} value={i}>
          {el?.name}
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;
