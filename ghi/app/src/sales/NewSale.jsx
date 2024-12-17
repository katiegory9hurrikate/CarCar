import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function SalesForm() {
  const [isVinAutoFilled, setIsVinAutoFilled] = useState(false);
  const [autos, setAutos] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [salespersons, setSalespersons] = useState([]);
  const [formData, setFormData] = useState({
    automobile: "",
    salesperson: "",
    customer: "",
    price: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const vin = query.get("vin");

    if (vin) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        automobile: vin,
      }));
      setIsVinAutoFilled(true);
    } else {
      setIsVinAutoFilled(false);
    }
  }, [location.search]);

  const getAutos = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutos(data.autos || []);
    }
  };

  const getCustomers = async () => {
    const url = "http://localhost:8090/api/customers/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setCustomers(data.customers || []);
    }
  };

  const getSalespersons = async () => {
    const url = "http://localhost:8090/api/salespeople/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setSalespersons(data.salespersons || []);
    }
  };

  useEffect(() => {
    getAutos();
    getCustomers();
    getSalespersons();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const auto = autos.find((auto) => auto.vin === formData.automobile);

    if (auto && auto.sold) {
      setErrorMessage("This automobile has already been sold.");
      return;
    } else {
      setErrorMessage("");
    }

    const salesUrl = "http://localhost:8090/api/sales/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesUrl, fetchConfig);

    if (response.ok) {
      setFormData({
        automobile: "",
        salesperson: "",
        customer: "",
        price: "",
      });
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;

    if (inputName === "automobile" && isVinAutoFilled) {
      return;
    }

    if (inputName === "price") {
      setFormData({
        ...formData,
        [inputName]: Number(value),
      });
    } else {
      setFormData({
        ...formData,
        [inputName]: value,
      });
    }
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Sale</h1>
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
          <form onSubmit={handleSubmit} id="create-sales-form">
          <div className="mb-3">
            <input
              onChange={handleFormChange}
              value={formData.automobile}
              placeholder="Automobile VIN"
              required
              type="text"
              name="automobile"
              id="automobile"
              className="form-control"
            />
          </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.customer}
                name="customer"
                id="customer"
                className="form-select"
              >
                <option value="">Select Customer</option>
                {customers.map((customer) => {
                  return (
                    <option key={customer.id} value={customer.id}>
                      {customer.first_name} {customer.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="mb-3">
              <select
                onChange={handleFormChange}
                value={formData.salesperson}
                name="salesperson"
                id="salesperson"
                className="form-select"
              >
                <option value="">Select Salesperson</option>
                {salespersons.map((salesperson) => {
                  return (
                    <option key={salesperson.id} value={salesperson.id}>
                      {salesperson.first_name} {salesperson.last_name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleFormChange}
                value={formData.price}
                placeholder="Price"
                required
                type="number"
                name="price"
                id="price"
                className="form-control"
              />
              <label htmlFor="price">Price</label>
            </div>
            <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesForm;
