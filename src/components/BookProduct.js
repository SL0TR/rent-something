import { useStateContext } from "context/Context";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import ProductSelect from "./ProductSelect";

const dateStringFormat = "YYYY-MM-DD";

function BookProduct() {
  const { selectedItem } = useStateContext();
  const [totalPrice, setTotalPrice] = useState();

  const [duration, setDuration] = useState([
    dayjs().format(dateStringFormat),
    dayjs()
      .add(selectedItem?.minimum_rent_period || 0, "day")
      .format(dateStringFormat),
  ]);

  function handleBookSubmit() {
    const daysInBetween = dayjs(duration[1]).diff(duration[0], "day");

    if (daysInBetween < selectedItem?.minimum_rent_period) {
      alert(
        `You have to rent it for minimum of ${selectedItem?.minimum_rent_period} days`
      );
      return;
    }

    const price = daysInBetween * (selectedItem?.price || 0);
    setTotalPrice(price);
  }

  function closeModal() {
    setTotalPrice(null);
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
                <ProductSelect />
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
                onClick={handleBookSubmit}
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

export default BookProduct;
