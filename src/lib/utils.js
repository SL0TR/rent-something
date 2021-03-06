export function getFilteredItems(query, list) {
  const filteredList = list.filter((el) =>
    el?.name.toLowerCase().includes(query.toLowerCase())
  );

  return filteredList;
}

export function getSelectedItem(obj, index) {
  return {
    ...obj,
    index,
  };
}
