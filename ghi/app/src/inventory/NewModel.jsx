import { useState, useEffect } from "react";

function ModelForm({ closeModal }) {
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    manufacturer_id: '',  // Ensure the manufacturer_id is part of formData
  });
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const modelsUrl = 'http://localhost:8100/api/models/';
      const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';

      const modelsResponse = await fetch(modelsUrl);
      const manufacturersResponse = await fetch(manufacturersUrl);

      if (modelsResponse.ok && manufacturersResponse.ok) {
        const modelsData = await modelsResponse.json();
        const manufacturersData = await manufacturersResponse.json();

        console.log("Manufacturers data:", manufacturersData); // Log manufacturers
        console.log("Models data:", modelsData); // Log models

        const manufacturers = manufacturersData.manufacturers || [];
        const models = modelsData.models || [];

        setManufacturers(manufacturers);
        setModels(models);
      } else {
        throw new Error(`Error fetching data`);
      }
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const modelsUrl = 'http://localhost:8100/api/models/';

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(modelsUrl, fetchConfig);

      if (response.ok) {
        setFormData({
          name: '',
          manufacturer_id: '',  // Reset manufacturer_id after successful submission
        });
        closeModal(); // Close the modal after a successful submission
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  return (
    <div className="container-fluid">
      <div className="shadow p-4 mt-4">
        <h1>Create a New Model</h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              onChange={handleFormChange}
              value={formData.name}
              placeholder="Name"
              required
              type="text"
              name="name"
              id="name"
              className="form-control"
            />
            <label htmlFor="name">Name</label>
          </div>
          <div className="form-floating mb-3">
            <select
              onChange={handleFormChange}
              value={formData.manufacturer_id}
              name="manufacturer_id"
              id="manufacturer_id"
              className="form-select"
              required
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.length > 0 ? (
                manufacturers
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((manufacturer) => (
                    <option key={manufacturer.id} value={manufacturer.id}>
                      {manufacturer.name}
                    </option>
                  ))
              ) : (
                <option disabled>No manufacturers available</option>
              )}
            </select>
            <label htmlFor="manufacturer_id">Manufacturer</label>
          </div>
          <button
            className="btn btn-primary"
            style={{
              color: '#198754',
              backgroundColor: '#ffffff',
              borderColor: '#198754',
            }}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModelForm;
