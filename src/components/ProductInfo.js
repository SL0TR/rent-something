function ProductInfo({ product, type = "book" }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{product?.name}</h5>
        <div className="row">
          {type === "book" ? (
            <div className="col-12">
              <strong>Minimum Rental Period</strong>
              {`${product?.minimum_rent_period}`}
            </div>
          ) : (
            <div className="col-12">
              <strong>Rental Period</strong>
              {product?.loanDays} days
            </div>
          )}

          <div className="col-12">
            <strong>Mileage</strong> {product?.mileage}
          </div>
          <div className="col-12">
            <strong>Need Fix?</strong> {product?.needing_repair ? "Yes" : "No"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
