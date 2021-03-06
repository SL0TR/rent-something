import { useStateContext } from "context/Context";
import { useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductSelect from "./ProductSelect";

function ReturnProduct() {
  const [totalPrice, setTotalPrice] = useState();

  const {
    allItems,
    setAllItems,
    bookedItems,
    setBookedItems,
    setSelectedItem,
    selectedItem,
  } = useStateContext();
  const mileage = selectedItem?.loanDays * 10;

  function handleEstimateSubmit() {
    const price = selectedItem?.loanDays * (selectedItem?.price || 0);
    setTotalPrice(price);
  }

  function handleBookSubmit() {
    const itemIndex = allItems.findIndex(
      (el) => el?.code === selectedItem?.code
    );

    let newItems = [...allItems];

    const daysInBetween = selectedItem?.loanDays;

    let durabilityPoint = 0;

    if (newItems[itemIndex]?.type === "plain") {
      durabilityPoint = 1;
    }

    if (newItems[itemIndex]?.type === "meter") {
      durabilityPoint = 2;
    }

    // daysInBetween + 2 * daysInBetween since each 10 miles 2 points is decreased and 10 miles is added each day
    const pointsToDeduct = durabilityPoint * daysInBetween + 2 * daysInBetween;

    newItems[itemIndex] = {
      ...newItems[itemIndex],
      mileage: (newItems[itemIndex]?.mileage || 0) + 10 * daysInBetween,
      durability: newItems[itemIndex]?.durability - pointsToDeduct,
      availability: true,
    };

    let newBookedItems = [...bookedItems];
    newBookedItems.splice(selectedItem?.index, 1);

    setBookedItems(newBookedItems);
    setAllItems(newItems);
    setSelectedItem();
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
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookModalLabel">
                Return A Product
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
                  <ProductSelect type="return" />
                  {selectedItem && (
                    <>
                      <div className="col-12 my-3">
                        <ProductInfo product={selectedItem} type="rent" />
                      </div>
                      <div className="col-12">
                        <p>Used Mileage</p>
                      </div>
                      <div className="col-12">
                        <strong>
                          <p>{mileage || 0}</p>
                        </strong>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="col-auto">
                  <p>
                    Your total Price is <strong>${totalPrice || 0} </strong>
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
                onClick={closeModal}
              >
                No
              </button>
              <button
                onClick={!totalPrice ? handleEstimateSubmit : handleBookSubmit}
                type="button"
                className="btn btn-primary"
                data-bs-dismiss={totalPrice ? "modal" : null}
                disabled={!selectedItem}
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
