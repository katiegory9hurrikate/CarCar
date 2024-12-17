import { useEffect, useState } from "react";

function TechnicianList() {
  const [technician, setTechnicianList] = useState([]);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/technicians/');
      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setTechnicianList(data.technicians || []);
      } else {
        console.error("Failed to fetch technicians:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching technicians:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
    <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
      <h1>Technicians</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {technician.map((tech) => {
            return (
              <tr key={tech.id}>
                <td>{tech.employee_id}</td>
                <td>{tech.first_name}</td>
                <td>{tech.last_name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}

export default TechnicianList;
