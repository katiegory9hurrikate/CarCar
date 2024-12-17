import { useEffect, useState } from "react";

function ModelForm() {
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    picture_url: '',
    manufacturer_id: '',
  });
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const modelsUrl = 'http://localhost:8100/api/models/';
      const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';


      const modelsResponse = await fetch(modelsUrl);
      if (modelsResponse.ok) {
        const data = await modelsResponse.json();
        setModels(data.models || []);
      } else {
        throw new Error(`Error: ${modelsResponse.status} ${modelsResponse.statusText}`);
      }

      const manufacturersResponse = await fetch(manufacturersUrl);
      if (manufacturersResponse.ok) {
        const data = await manufacturersResponse.json();
        setManufacturers(data.manufacturers || []);
      } else {
        throw new Error(`Error: ${manufacturersResponse.status} ${manufacturersResponse.statusText}`);
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
          picture_url: '',
          manufacturer_id: '',
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
          <h1>Create a New Model</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} id="create-model-form">
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
              <input
                onChange={handleFormChange}
                value={formData.picture_url}
                placeholder="Picture URL"
                required
                type="text"
                name="picture_url"
                id="picture_url"
                className="form-control"
              />
              <label htmlFor="picture_url">Picture URL</label>
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
                {manufacturers.map((manufacturer) => (
                  <option key={manufacturer.id} value={manufacturer.id}>
                    {manufacturer.name}
                  </option>
                ))}
              </select>
              <label htmlFor="manufacturer_id">Manufacturer</label>
            </div>
            <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModelForm;
