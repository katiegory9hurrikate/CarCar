import { useEffect, useState } from "react";

function ModelList() {
  const [models, setModels] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setModels(data.models || []);
    } else {
      console.error('Failed to fetch models:', response.status, response.statusText);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
      <h1>Models</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Picture URL</th>
            <th>Manufacturer</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.id}>
              <td>{model.name}</td>
              <td>
                <div className="model-image-hover">
                  <a href={model.picture_url}>
                    {model.picture_url}
                  </a>
                  <div className="model-image-popup">
                    <img src={model.picture_url} alt={model.name} style={{ width: "100%" }} />
                  </div>
                </div>
              </td>
              <td>{model.manufacturer.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default ModelList;
