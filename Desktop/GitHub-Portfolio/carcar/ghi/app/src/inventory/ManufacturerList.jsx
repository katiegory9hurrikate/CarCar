import { useEffect, useState } from "react";

function ManufacturerList() {
  const [manufacturers, setManufacturers] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8100/api/manufacturers/");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setManufacturers(data.manufacturers || []);
    } else {
      console.error('Failed to fetch manufacturers:', response.status, response.statusText);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
      <h1>Manufacturers</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers.map((manufacturer) => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default ManufacturerList;
