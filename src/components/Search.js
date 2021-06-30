import { useStateContext } from "context/Context";
import { getFilteredItems } from "lib/utils";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";

function Search() {
  const [searchText, setSearchText] = useState("");
  const { setFilteredItems, allItems } = useStateContext();

  function filterList(query, list) {
    setFilteredItems(getFilteredItems(query, list));
  }

  const debounceFilterList = useCallback(debounce(filterList, 300), []);

  useEffect(() => {
    if (searchText) {
      debounceFilterList(searchText, allItems);
      return;
    }

    setFilteredItems(allItems);
  }, [allItems, setFilteredItems, searchText, debounceFilterList]);

  return (
    <div className="row justify-content-end">
      <div className="col-4 mb-4">
        <div className="input-group mb-3">
          <input
            value={searchText}
            onChange={(e) => setSearchText(e?.target?.value)}
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
