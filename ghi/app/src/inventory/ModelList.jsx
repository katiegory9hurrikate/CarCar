import React, { useEffect, useState } from "react";

function ModelList() {
  const [models, setModels] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/models/");

    if (response.ok) {
      const data = await response.json();
      console.log(data);

      const sortedModels = data.models.sort((a, b) => {
        if (a.manufacturer.name < b.manufacturer.name) return -1;
        if (a.manufacturer.name > b.manufacturer.name) return 1;
        return a.name.localeCompare(b.name);
      });

      setModels(sortedModels || []);
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
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={model.id}>
                <td>{model.name}</td>
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
