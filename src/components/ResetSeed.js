import { useStateContext } from "context/Context";
import { seedItems } from "lib/storage";
import React from "react";

function ResetSeedData() {
  const { setAllItems, setBookedItems } = useStateContext();

  function handleResetSeed() {
    setAllItems(seedItems);
    setBookedItems([]);
    window.location.reload();
  }

  return (
    <button onClick={handleResetSeed} type="button" className="btn btn-success">
      Reset Seed Data
    </button>
  );
}

export default ResetSeedData;
