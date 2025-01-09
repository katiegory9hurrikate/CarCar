import { useState, useEffect } from "react";

function AutomobileForm() {
  const [models, setModels] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [modelSearchTerm, setModelSearchTerm] = useState('');
  const [manufacturerSearchTerm, setManufacturerSearchTerm] = useState('');
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [isAddingModel, setIsAddingModel] = useState(false);
  const [isAddingManufacturer, setIsAddingManufacturer] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [showManufacturerDropdown, setShowManufacturerDropdown] = useState(false);
  const [error, setError] = useState(null);
  const [groupedModels, setGroupedModels] = useState({});
  const [filteredGroupedModels, setFilteredGroupedModels] = useState({});

  const [formData, setFormData] = useState({
    vin: '',
    picture_url: '',
    color: '',
    year: '',
  });

  const groupModelsByManufacturer = (modelsList) => {
    return modelsList.reduce((grouped, model) => {
      const manufacturerName = model.manufacturer.name;
      if (!grouped[manufacturerName]) {
        grouped[manufacturerName] = [];
      }
      grouped[manufacturerName].push(model);
      return grouped;
    }, {});
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modelsResponse, manufacturersResponse] = await Promise.all([
          fetch('http://localhost:8100/api/models/'),
          fetch('http://localhost:8100/api/manufacturers/')
        ]);

        if (modelsResponse.ok && manufacturersResponse.ok) {
          const modelsData = await modelsResponse.json();
          const manufacturersData = await manufacturersResponse.json();

          // Sort manufacturers alphabetically
          const sortedManufacturers = (manufacturersData.manufacturers || [])
            .sort((a, b) => a.name.localeCompare(b.name));

          // Sort models within each manufacturer group
          const sortedModels = (modelsData.models || [])
            .sort((a, b) => a.name.localeCompare(b.name));

          const grouped = groupModelsByManufacturer(sortedModels);

          setModels(sortedModels);
          setGroupedModels(grouped);
          setFilteredGroupedModels(grouped);
          setManufacturers(sortedManufacturers);
        }
      } catch (e) {
        setError("Failed to fetch initial data");
        console.error(e);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.model-dropdown-container')) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.manufacturer-dropdown-container')) {
        setShowManufacturerDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleModelSearch = (e) => {
    const value = e.target.value;
    setModelSearchTerm(value);

    if (value === '') {
      setFilteredGroupedModels(groupedModels);
      setShowModelDropdown(true);
      setIsAddingModel(false);
    } else {
      const filtered = {};
      Object.entries(groupedModels).forEach(([manufacturer, modelList]) => {
        const filteredModels = modelList.filter(model =>
          model.name.toLowerCase().includes(value.toLowerCase())
        );

        // Show models for the manufacturer as well
        if (manufacturer.toLowerCase().includes(value.toLowerCase()) || filteredModels.length > 0) {
          filtered[manufacturer] = filteredModels.length > 0 ? filteredModels : modelList;
        }
      });
      setFilteredGroupedModels(filtered);
    }
  };

  const handleManufacturerSearch = (e) => {
    const value = e.target.value;
    setManufacturerSearchTerm(value);

    if (value === '') {
      setShowManufacturerDropdown(true);
      setIsAddingManufacturer(false);
    }
  };

  const selectModel = (model) => {
    setSelectedModel(model);
    setModelSearchTerm(model.name);
    setShowModelDropdown(false);
    setIsAddingModel(false);
  };

  const selectManufacturer = (manufacturer) => {
    setSelectedManufacturer(manufacturer);
    setManufacturerSearchTerm(manufacturer.name);
    setShowManufacturerDropdown(false);
  };

  const handleAddNewModel = () => {
    setIsAddingModel(true);
    setShowModelDropdown(false);
  };

  const handleAddNewManufacturer = () => {
    setIsAddingManufacturer(true);
    setShowManufacturerDropdown(false);
  };

  const createNewManufacturer = async () => {
    try {
      const response = await fetch('http://localhost:8100/api/manufacturers/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: manufacturerSearchTerm })
      });

      if (!response.ok) throw new Error('Failed to create manufacturer');

      const newManufacturer = await response.json();
      setManufacturers(prev => [...prev, newManufacturer]);
      return newManufacturer;
    } catch (e) {
      throw new Error('Failed to create manufacturer: ' + e.message);
    }
  };

  const createNewModel = async (manufacturerId) => {
    try {
      const response = await fetch('http://localhost:8100/api/models/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: modelSearchTerm,
          manufacturer_id: manufacturerId
        })
      });

      if (!response.ok) throw new Error('Failed to create model');

      const newModel = await response.json();
      setModels(prev => [...prev, newModel]);
      return newModel;
    } catch (e) {
      throw new Error('Failed to create model: ' + e.message);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      let finalManufacturer = selectedManufacturer;
      let finalModel = selectedModel;

      // Create new manufacturer if needed
      if (isAddingManufacturer) {
        finalManufacturer = await createNewManufacturer();
      }

      // Create new model if needed
      if (isAddingModel) {
        finalModel = await createNewModel(finalManufacturer.id);
      }

      // Create the automobile
      const response = await fetch('http://localhost:8100/api/automobiles/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          model_id: finalModel.id
        })
      });

      if (!response.ok) throw new Error('Failed to create automobile');

      // Reset form and all dropdowns
      setFormData({
        vin: '',
        picture_url: '',
        color: '',
        year: '',
      });
      setModelSearchTerm('');
      setManufacturerSearchTerm('');
      setSelectedModel(null);
      setSelectedManufacturer(null);
      setIsAddingModel(false);
      setIsAddingManufacturer(false);
      setShowManufacturerDropdown(false);
      setShowModelDropdown(false);

    } catch (e) {
      setError(e.message);
      console.error(e);
    }
  };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Add New Automobile</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            {/* Basic automobile fields */}
            <div className="form-floating mb-3">
              <input
                type="text"
                name="vin"
                id="vin"
                value={formData.vin}
                onChange={handleFormChange}
                className="form-control"
                placeholder="VIN"
                required
              />
              <label htmlFor="vin">VIN</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="color"
                id="color"
                value={formData.color}
                onChange={handleFormChange}
                className="form-control"
                placeholder="Color"
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
                className="form-control"
                placeholder="Year"
                required
              />
              <label htmlFor="year">Year</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="picture_url"
                id="picture_url"
                value={formData.picture_url}
                onChange={handleFormChange}
                className="form-control"
                placeholder="Picture URL"
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>

            {/* Model selection/creation */}
            <div className="form-floating mb-3 position-relative model-dropdown-container">
              <input
                type="text"
                value={modelSearchTerm}
                onChange={handleModelSearch}
                onFocus={() => setShowModelDropdown(true)}
                className="form-control"
                placeholder="Search Model"
                required
              />
              <label>Model</label>

              {showModelDropdown && !isAddingModel && (
                <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                  <li
                    className="list-group-item list-group-item-action text-primary"
                    onClick={handleAddNewModel}
                  >
                    + Add New Model
                  </li>
                  {Object.entries(filteredGroupedModels).map(([manufacturer, modelList]) => (
                    <div key={manufacturer}>
                      <li className="list-group-item list-group-item-secondary fw-bold">
                        {manufacturer}
                      </li>
                      {modelList.map(model => (
                        <li
                          key={model.id}
                          className="list-group-item list-group-item-action ps-4"
                          onClick={() => selectModel(model)}
                        >
                          {model.name}
                        </li>
                      ))}
                    </div>
                  ))}
                </ul>
              )}
            </div>

            {/* Manufacturer selection/creation */}
            {isAddingModel && (
              <div className="form-floating mb-3 position-relative manufacturer-dropdown-container">
                <input
                  type="text"
                  value={manufacturerSearchTerm}
                  onChange={handleManufacturerSearch}
                  onFocus={() => setShowManufacturerDropdown(true)}
                  className="form-control"
                  placeholder="Search Manufacturer"
                  required
                />
                <label>Manufacturer</label>

                {showManufacturerDropdown && !isAddingManufacturer && (
                  <ul className="list-group position-absolute w-100" style={{ zIndex: 1000, maxHeight: '200px', overflowY: 'auto' }}>
                    <li
                      className="list-group-item list-group-item-action text-primary"
                      onClick={handleAddNewManufacturer}
                    >
                      + Add New Manufacturer
                    </li>
                    {manufacturers.map(manufacturer => (
                      <li
                        key={manufacturer.id}
                        className="list-group-item list-group-item-action"
                        onClick={() => selectManufacturer(manufacturer)}
                      >
                        {manufacturer.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            <button type="submit" className="btn btn-primary">
              Create Vehicle
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AutomobileForm;
