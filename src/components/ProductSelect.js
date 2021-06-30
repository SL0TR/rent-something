import { useStateContext } from "context/Context";
import { getSelectedItem } from "lib/utils";

function ProductSelect({ type = "book" }) {
  const {
    selectedItem,
    setSelectedItem,
    allItems,
    bookedItems,
    setReturnItem,
    returnItem,
  } = useStateContext();

  const availableItems = allItems.filter((el) => el.availability === true);
  const isBooking = type === "book";
  const list = isBooking ? availableItems : bookedItems;

  function handleItemSelect(index) {
    if (isBooking) {
      const newItem = getSelectedItem(list[index], index);
      setSelectedItem(newItem);
      return;
    }

    const newItem = getSelectedItem(bookedItems[index], index);
    setReturnItem(newItem);
  }

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={(e) => handleItemSelect(+e?.target?.value)}
      value={isBooking ? selectedItem?.index : returnItem?.index}
    >
      {(isBooking ? !selectedItem?.code : !returnItem?.code) && (
        <option>Please select</option>
      )}
      {list.map((el, i) => (
        <option key={el?.code} value={i}>
          {el?.name}
        </option>
      ))}
    </select>
  );
}

export default ProductSelect;
