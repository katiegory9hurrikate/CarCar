import { useEffect, useState } from "react";

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [formData, setFormData] = useState({
    vin: '',
    color: '',
    year: '',
    model_id: '',
  });
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const url = 'http://localhost:8100/api/models/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setModels(data.models || []);
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
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

    const automobilesUrl = 'http://localhost:8100/api/automobiles/';

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(automobilesUrl, fetchConfig);

      if (response.ok) {
        setFormData({
          vin: '',
          color: '',
          year: '',
          model_id: '',
        });
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
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Automobile</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} id="create-inventory-form">
            <div className="form-floating mb-s">
              <input onChange={handleFormChange} value={formData.color} placeholder="Color" required type="text" name="color" id="color" className="form-control mb-3" />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-s">
              <input onChange={handleFormChange} value={formData.year} placeholder="Year" required type="number" name="year" id="year" className="form-control mb-3" />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-s">
              <input onChange={handleFormChange} value={formData.vin} placeholder="VIN" required type="text" name="vin" id="vin" className="form-control mb-3" />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="form-floating mb-s">
              <select onChange={handleFormChange} value={formData.model_id} required name="model_id" id="model_id" className="form-select mb-3">
                <option value="">Choose a Model</option>
                {models.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              <label htmlFor="model_id">Model</label>
            </div>
            <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
