import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UnsoldAutomobileList() {
  const [autos, setAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch("http://localhost:8100/api/automobiles/");
      if (response.ok) {
        const data = await response.json();
        // Filter out sold vehicles
        const unsoldAutos = data.autos.filter(auto => !auto.sold);
        setAutos(unsoldAutos);
        setLoading(false);
      } else {
        throw new Error(
          `Oops! We forgot where we parked the cars!: ${response.status} ${response.statusText}`
        );
      }
    } catch (e) {
      console.error(e);
      setError("Oops! We forgot where we parked the cars!");
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return <div>Garage doors are opening...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0 text-center">
        <h1 className="display-5 fw-bold">Unsold Inventory</h1>
        <div className="col-lg-6 mx-auto">
        </div>
      </div>
      <div className="container">
      <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/inventory/new" className="btn btn-lg px-4 mb-4" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>
              Add a New Automobile
            </Link>
          </div>
        <div className="row">
          {autos.length > 0 ? (
            autos.map((auto) => (
              <div key={auto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-img-container">
                    <img src={auto.model.picture_url} className="card-img-top" alt={auto.model.name} />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">{auto.model.name}</h5>
                    <p className="card-text" style={{marginBottom: '-3px'}}><strong>VIN:</strong> {auto.vin}</p>
                    <p className="card-text" style={{marginBottom: '-3px'}}><strong>Color:</strong> {auto.color}</p>
                    <p className="card-text" style={{marginBottom: '-3px'}}><strong>Year:</strong> {auto.year}</p>
                    <p className="card-text" style={{marginBottom: '-3px'}}>
                      <strong>Make:</strong> {auto.model.manufacturer.name}
                    </p>
                    <p className="card-text"><strong>Sold:</strong> {auto.sold ? "Yes" : "No"}</p>
                    {!auto.sold && (
                      <Link to={`/sales/new?vin=${auto.vin}`} className="btn" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>
                        Sell This Car
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No unsold automobiles Found</h4>
              <p>Oops! We forgot where we parked the cars!</p>
              <hr />
              <p className="mb-0">
                <Link to="/inventory/new" className="btn" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>
                  Add a New Automobile
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UnsoldAutomobileList;
