import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function AutomobileList() {
  const [autos, setAutos] = useState([]);
  const [sales, setSales] = useState({});
  const [filteredAutos, setFilteredAutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUnsold, setShowUnsold] = useState(false);

  // Track which field and which vehicle is being edited
  const [editingField, setEditingField] = useState(null);
  const [editingVehicleId, setEditingVehicleId] = useState(null);
  const [newFieldValue, setNewFieldValue] = useState("");

  // Filters
  const [filters, setFilters] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
  });

  const getData = async () => {
    try {
      const autoResponse = await fetch("http://localhost:8100/api/automobiles/");
      const salesResponse = await fetch("http://localhost:8090/api/sales/");
      if (autoResponse.ok && salesResponse.ok) {
        const autoData = await autoResponse.json();
        const salesData = await salesResponse.json();

        setAutos(autoData.autos);
        // Map sales data by VIN for quick lookup
        const salesMap = salesData.sales.reduce((acc, sale) => {
          acc[sale.automobile.vin] = sale.price;
          return acc;
        }, {});
        console.log(salesMap);
        setSales(salesMap);
        setLoading(false);
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (e) {
      console.error(e);
      setError("Oops! Unable to fetch data.");
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const filtered = autos.filter((auto) => {
      const matchesUnsold = showUnsold ? !auto.sold : true;
      const matchesMake = filters.make
        ? auto.model.manufacturer.name.toLowerCase().includes(filters.make.toLowerCase())
        : true;
      const matchesModel = filters.model
        ? auto.model.name.toLowerCase().includes(filters.model.toLowerCase())
        : true;
      const matchesYear = filters.year ? auto.year.toString() === filters.year : true;
      const matchesColor = filters.color
        ? auto.color.toLowerCase().includes(filters.color.toLowerCase())
        : true;

      return matchesUnsold && matchesMake && matchesModel && matchesYear && matchesColor;
    });

    const sorted = filtered.sort((a, b) => (a.sold === b.sold ? 0 : a.sold ? 1 : -1));
    setFilteredAutos(sorted);
  }, [showUnsold, filters, autos]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const getUniqueValues = (keyExtractor, isYear = false) => {
    return [...new Set(autos.map(keyExtractor))]
      .filter((item) => item !== undefined && item !== null)
      .sort((a, b) => {
        if (isYear) {
          return a - b;
        }
        return a.localeCompare(b);
      });
  };

  const handleEditField = (field, value, autoId) => {
    setEditingField(field);
    setEditingVehicleId(autoId);
    setNewFieldValue(value);
  };

  const handleSaveField = (autoId, field) => {
    const updatedAutos = autos.map((auto) => {
      if (auto.id === autoId) {
        auto[field] = newFieldValue;
      }
      return auto;
    });
    setAutos(updatedAutos);
    setEditingField(null);
    setEditingVehicleId(null);
  };

  if (loading) {
    return <div>Garage doors are opening...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <>
      <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0 text-center">
        <h1 className="display-5 fw-bold">All Inventory</h1>
      </div>
      <div className="container">
        {/* Filter Section */}
        <div className="row mb-4">
        <div className="col-md-3">
          <label htmlFor="make" className="form-label">Make</label>
          <select
            name="make"
            id="make"
            className="form-select"
            value={filters.make}
            onChange={handleFilterChange}
          >
            <option value="">All Makes</option>
            {getUniqueValues((auto) => auto.model.manufacturer.name).map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="model" className="form-label">Model</label>
          <select
            name="model"
            id="model"
            className="form-select"
            value={filters.model}
            onChange={handleFilterChange}
          >
            <option value="">All Models</option>
            {getUniqueValues((auto) => auto.model.name).map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="year" className="form-label">Year</label>
          <select
            name="year"
            id="year"
            className="form-select"
            value={filters.year}
            onChange={handleFilterChange}
          >
            <option value="">All Years</option>
            {getUniqueValues((auto) => auto.year, true).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label htmlFor="color" className="form-label">Color</label>
          <select
            name="color"
            id="color"
            className="form-select"
            value={filters.color}
            onChange={handleFilterChange}
          >
            <option value="">All Colors</option>
            {getUniqueValues((auto) => auto.color).map((color) => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      </div>

        {/* Filter Buttons */}
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button
            onClick={() => setShowUnsold(!showUnsold)}
            className="btn btn-lg px-4 mb-4"
            style={{
              color: "#198754",
              backgroundColor: "#ffffff",
              borderColor: "#198754",
              marginRight: "25px",
            }}
          >
            {showUnsold ? "Show All Vehicles" : "Show Unsold Vehicles"}
          </button>
          <Link
            to="/inventory/new"
            className="btn btn-lg px-4 mb-4"
            style={{
              color: "#198754",
              backgroundColor: "#ffffff",
              borderColor: "#198754",
            }}
          >
            Add a New Vehicle
          </Link>
        </div>

        {/* Display Filtered Autos */}
        <div className="row">
          {filteredAutos.length > 0 ? (
            filteredAutos.map((auto) => (
              <div key={auto.id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div className="card">
                  <div className="card-img-container">
                    <img
                      src={auto.picture_url}
                      className="card-img-top"
                      alt={auto.model.name}
                    />
                  </div>
                  <div className="card-body">
                    <h5 className="card-title">
                      {auto.model.name}{" "}
                      <span style={{ fontSize: "0.95rem", color: "#6c757d" }}>&nbsp;&nbsp;&nbsp;
                        {auto.model.manufacturer.name}
                      </span>
                    </h5>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "-3px"  }}>
                      <strong>Year:</strong>&nbsp;
                      {editingField === "year" && editingVehicleId === auto.id ? (
                        <>
                          <input
                            type="text"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
                            className="form-control form-control-sm"
                          />
                          <button
                            onClick={() => handleSaveField(auto.id, "year")}
                            style={{
                              backgroundColor: "#198754",
                              color: "#fff",
                              border: "none",
                              marginLeft: "10px",
                            }}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {auto.year}{" "}
                          <button
                            onClick={() => handleEditField("year", auto.year, auto.id)}
                            style={{ border: "none", background: "none" }}
                          >
                            <img
                              src="https://i.imgur.com/C4JUhyK.png"
                              alt="Edit"
                              style={{ width: "14px", height: "14px" }}
                            />
                          </button>
                        </>
                      )}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "-2px" }}>
                      <strong>Color:</strong>&nbsp;
                      {editingField === "color" && editingVehicleId === auto.id ? (
                        <>
                          <input
                            type="text"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
                            className="form-control form-control-sm"
                          />
                          <button
                            onClick={() => handleSaveField(auto.id, "color")}
                            style={{
                              backgroundColor: "#198754",
                              color: "#fff",
                              border: "none",
                              marginLeft: "10px",
                            }}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {auto.color}{" "}
                          <button
                            onClick={() => handleEditField("color", auto.color, auto.id)}
                            style={{ border: "none", background: "none" }}
                          >
                            <img
                              src="https://i.imgur.com/C4JUhyK.png"
                              alt="Edit"
                              style={{ width: "14px", height: "14px" }}
                            />
                          </button>
                        </>
                      )}
                    </div>

                    <p className="card-text" style={{ marginBottom: "-2px" }}>
                      <strong>VIN:</strong> {auto.vin}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", marginBottom: "-2px"  }}>
                      <strong>Price:</strong>&nbsp;
                      {editingField === "price" && editingVehicleId === auto.id ? (
                        <>
                          <input
                            type="text"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
                            className="form-control form-control-sm"
                          />
                          <button
                            onClick={() => handleSaveField(auto.id, "price")}
                            style={{
                              backgroundColor: "#198754",
                              color: "#fff",
                              border: "none",
                              marginLeft: "10px",
                            }}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          {formatCurrency(auto.price)}{" "}
                          <button
                            onClick={() => handleEditField("price", auto.price, auto.id)}
                            style={{ border: "none", background: "none" }}
                          >
                            <img
                              src="https://i.imgur.com/C4JUhyK.png"
                              alt="Edit"
                              style={{ width: "14px", height: "14px" }}
                            />
                          </button>
                        </>
                      )}
                    </div>

                    <p className="card-text">
                      <strong>Sold:</strong>&nbsp;{auto.sold ? "Yes" : "No"}
                    </p>

                    {auto.sold && (
                      <p className="card-text">
                        <strong>Sale Price:</strong>&nbsp;{formatCurrency(sales[auto.vin])}
                      </p>
                    )}

                    {!auto.sold && (

                      <p className="card-text">
                      <strong>Sale Price:</strong>&nbsp;{formatCurrency(sales[auto.vin])}
                      </p>,
                      <center><Link
                        to={`/sales/new?vin=${auto.vin}&price=${auto.price}`}
                        className="btn"
                        style={{
                          color: "#198754",
                          backgroundColor: "#ffffff",
                          borderColor: "#198754",
                        }}
                      >Sell This Car</Link></center>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="alert alert-warning">
              <h4 className="alert-heading">404 - No Automobiles Found</h4>
              <p>Oops! We forgot where we parked the cars!</p>
              <hr />
              <p className="mb-0">
                <Link
                  to="/automobiles/new"
                  className="btn"
                  style={{
                    color: "#198754",
                    backgroundColor: "#ffffff",
                    borderColor: "#198754",
                  }}
                >
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

export default AutomobileList;
