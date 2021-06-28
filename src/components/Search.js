import React, { useEffect, useRef } from "react";

function Search({ setFilteredItems, items }) {
  const searchInputRef = useRef(null);

  function handleSearchTextChange() {
    const searchText = searchInputRef?.current?.value;
    const filteredList = items.filter((el) =>
      el?.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredItems(filteredList);
  }

  useEffect(() => {
    setFilteredItems(items);
  }, [items, setFilteredItems]);

  return (
    <div className="row justify-content-end">
      <div className="col-4 mb-4">
        <div className="input-group mb-3">
          <input
            ref={searchInputRef}
            onChange={handleSearchTextChange}
            type="text"
            className="form-control"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="basic-addon1"
          />
        </div>
      </div>
    </div>
  );
}

export default Search;
