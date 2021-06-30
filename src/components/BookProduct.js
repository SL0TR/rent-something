import { useStateContext } from "context/Context";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ProductInfo from "./ProductInfo";
import ProductSelect from "./ProductSelect";

const dateStringFormat = "YYYY-MM-DD";

function BookProduct() {
  const {
    selectedItem,
    setSelectedItem,
    allItems,
    setAllItems,
    setBookedItems,
  } = useStateContext();
  const [totalPrice, setTotalPrice] = useState();
  const [duration, setDuration] = useState([
    dayjs().format(dateStringFormat),
    dayjs()
      .add(selectedItem?.minimum_rent_period || 0, "day")
      .format(dateStringFormat),
  ]);

  function getDaysInBetween() {
    return dayjs(duration[1]).diff(duration[0], "day");
  }

  function handleEstimateSubmit() {
    const daysInBetween = getDaysInBetween();

    if (daysInBetween < selectedItem?.minimum_rent_period) {
      alert(
        `You have to rent it for minimum of ${selectedItem?.minimum_rent_period} days`
      );
      return;
    }

    const price = daysInBetween * (selectedItem?.price || 0);
    setTotalPrice(price);
  }

  function handleBookSubmit() {
    if (!selectedItem?.availability) return;

    const daysInBetween = getDaysInBetween();
    const itemIndex = allItems.findIndex(
      (el) => el?.code === selectedItem?.code
    );

    let newItems = [...allItems];

    newItems[itemIndex] = {
      ...newItems[itemIndex],
      availability: false,
    };

    const bookedItem = {
      ...newItems[itemIndex],
      loanDays: daysInBetween,
    };
    setBookedItems((state) => [bookedItem, ...state]);
    setAllItems(newItems);
    setSelectedItem(null);
    closeModal();
  }

  function closeModal() {
    setTotalPrice();
  }

  useEffect(() => {
    setDuration((prevState) => [
      prevState[0],
      dayjs()
        .add(selectedItem?.minimum_rent_period || 0, "day")
        .format(dateStringFormat),
    ]);
  }, [selectedItem]);

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#bookModal"
      >
        Book
      </button>

      <div
        className="modal fade"
        id="bookModal"
        tabIndex="-1"
        aria-labelledby="bookModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="bookModalLabel">
                Book A Product
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                {!totalPrice ? (
                  <>
                    <div className="col-12 my-3">
                      <ProductSelect type="book" />
                    </div>
                    {selectedItem && (
                      <>
                        <div className="col-12 mb-3">
                          <ProductInfo product={selectedItem} />
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label className="mb-1" htmlFor="fromInput">
                              From
                            </label>
                            <input
                              value={duration[0]}
                              type="date"
                              className="form-control"
                              id="fromInput"
                              onChange={(e) =>
                                setDuration([e.target.value, duration[1]])
                              }
                            />
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="form-group">
                            <label className="mb-1" htmlFor="toInput">
                              To
                            </label>
                            <input
                              value={duration[1]}
                              type="date"
                              className="form-control"
                              id="toInput"
                              onChange={(e) =>
                                setDuration([duration[0], e.target.value])
                              }
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="col-auto">
                    <p>
                      Your total Price is <strong>${totalPrice} </strong>
                    </p>
                    Do you want to proceed?
                  </div>
                )}
              </div>
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
                data-bs-dismiss={totalPrice ? "modal" : null}
                className="btn btn-primary"
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

export default BookProduct;
