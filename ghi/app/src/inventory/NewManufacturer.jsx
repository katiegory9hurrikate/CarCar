import { useEffect, useState } from "react";

function ManufacturerForm() {
  const [manufacturers, setManufacturers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [error, setError] = useState(null);

  const getData = async () => {
    try {
      const url = 'http://localhost:8100/api/manufacturers/';
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setManufacturers(data.manufacturers);
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

    const manufacturersUrl = 'http://localhost:8100/api/manufacturers/';

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch(manufacturersUrl, fetchConfig);

      if (response.ok) {
        setFormData({
          name: '',
        });
        getData();
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
          <h1>Create a New Manufacturer</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit} id="create-manufacturer-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
              <label htmlFor="name">Name</label>
            </div>
            <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
