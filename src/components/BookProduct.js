import { useStateContext } from "context/Context";
import React from "react";

function BookProduct() {
  const { selectedItem } = useStateContext();

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
                {selectedItem?.name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-6">
                  <div className="form-group">
                    <label className="mb-1" for="fromInput">
                      From
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="fromInput"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-group">
                    <label className="mb-1" for="toInput">
                      To
                    </label>
                    <input type="date" className="form-control" id="toInput" />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                No
              </button>
              <button type="button" className="btn btn-primary">
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
