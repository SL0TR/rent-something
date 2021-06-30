import { useStateContext } from "context/Context";
import { useState } from "react";
import ProductSelect from "./ProductSelect";

function ReturnProduct() {
  const [totalPrice, setTotalPrice] = useState();
  const [mileage, setMileage] = useState();
  const { selectedItem, filteredItems, allItems, setAllItems } =
    useStateContext();

  function handleEstimateSubmit() {
    const price = selectedItem?.price || 0;
    setTotalPrice(price);
  }

  function handleBookSubmit() {
    const itemIndex = filteredItems.findIndex(
      (el) => el?.code === selectedItem?.code
    );

    let oldItems = [...allItems];

    // let durabilityPoint = 0;

    // if (oldItems[itemIndex]?.type === "plain") {
    //   durabilityPoint = 1;
    // }

    // if (oldItems[itemIndex]?.type === "meter") {
    //   durabilityPoint = 2;
    // }

    oldItems[itemIndex] = {
      ...oldItems[itemIndex],
      // mileage: (oldItems[itemIndex]?.mileage || 0) + 10 * daysInBetween,
      // durability:
      //   oldItems[itemIndex]?.durability - durabilityPoint * daysInBetween,
    };

    setAllItems(oldItems);
    closeModal();
  }

  function closeModal() {
    setTotalPrice(null);
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Return
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookModalLabel">
                Rent A Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {!totalPrice ? (
                <div className="col-12 my-3">
                  <ProductSelect />
                  <div className="input-group mt-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Mileage"
                      aria-label="Mileage"
                      aria-describedby="basic-addon1"
                      value={mileage}
                      onChange={(e) => setMileage(e?.target?.value)}
                    />
                  </div>
                </div>
              ) : (
                <div className="col-auto">
                  <p>
                    Your total Price is <strong>${totalPrice} </strong>
                  </p>
                  Do you want to proceed?
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button
                onClick={!totalPrice ? handleEstimateSubmit : handleBookSubmit}
                type="button"
                className="btn btn-primary"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReturnProduct;
