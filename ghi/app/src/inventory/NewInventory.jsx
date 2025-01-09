import { useState, useEffect } from "react";
import ModelForm from "./NewModel"; // Adjust import as needed

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    vin: '',
    picture_url: '',
    color: '',
    year: '',
    model_id: '',
  });
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8100/api/models/');
      if (response.ok) {
        const data = await response.json();
        setModels(data.models || []);
        setFilteredModels(data.models || []);
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

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    filterModels(value);
  };

  const filterModels = (value) => {
    if (value !== "") {
      const filtered = models.filter(model =>
        model.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredModels(filtered);
    } else {
      setFilteredModels(models);
    }
  };

  const handleModelSelect = (model) => {
    setFormData({
      ...formData,
      model_id: model.id,
    });
    setSearchTerm(model.name);
    setIsDropdownOpen(false);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

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
          picture_url: '',
          color: '',
          year: '',
          model_id: '',
        });
        setSearchTerm('');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsDropdownOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Add New Automobile</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="picture_url"
                  id="picture_url"
                  value={formData.picture_url}
                  onChange={handleFormChange}
                  placeholder="Picture URL"
                  className="form-control"
                />
                <label htmlFor="picture_url">Picture URL</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="color"
                  id="color"
                  value={formData.color}
                  onChange={handleFormChange}
                  placeholder="Color"
                  className="form-control"
                  required
                />
                <label htmlFor="color">Color</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={formData.year}
                  onChange={handleFormChange}
                  placeholder="Year"
                  className="form-control"
                  required
                />
                <label htmlFor="year">Year</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  name="vin"
                  id="vin"
                  value={formData.vin}
                  onChange={handleFormChange}
                  placeholder="VIN"
                  className="form-control"
                  required
                />
                <label htmlFor="vin">VIN</label>
              </div>

              <div className="form-floating mb-3 position-relative">
                <input
                  type="text"
                  name="model_id"
                  id="model_id"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  onFocus={handleInputFocus}
                  onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                  placeholder="Search Model"
                  className="form-control"
                  required
                />
                <label htmlFor="model_id">Model</label>
                {isDropdownOpen && (
                  <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto', backgroundColor: 'white', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                    <li
                      className="list-group-item list-group-item-action text-primary"
                      onClick={openModal}
                      style={{ borderBottom: '1px solid #dee2e6' }}
                    >
                      + add new model
                    </li>
                    {filteredModels.map((model) => (
                      <li
                        key={model.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => handleModelSelect(model)}
                      >
                        {model.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button type="submit" className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal for ModelForm */}
      {isModalOpen && (
        <div
          className="modal fade show"
          tabIndex="-1"
          style={{
            display: 'block',
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          aria-modal="true"
        >
          <div className="modal-dialog" style={{ maxWidth: '45%' }}>
            <div className="modal-content w-100" style={{ width: '100%' }}>
              <button
                type="button"
                className="btn-close"
                style={{
                  color: '#198754',
                  backgroundColor: '#ffffff',
                  borderColor: '#198754',
                  position: 'absolute',
                  right: '15px',
                  top: '15px',
                  zIndex: 1
                }}
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={closeModal}
              ></button>
              <div className="modal-body">
                <div className="d-flex justify-content-center">
                  <div className="w-100">
                    <ModelForm closeModal={closeModal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AutomobileForm;
