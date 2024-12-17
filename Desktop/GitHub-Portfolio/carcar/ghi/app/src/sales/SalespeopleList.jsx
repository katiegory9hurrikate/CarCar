import { useEffect, useState } from "react";

function Salespeople() {
  const [salespeople, setSalespeople] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8090/api/salespeople/");

    if (response.ok) {
      const data = await response.json();
      console.log("Data received:", data);
      setSalespeople(data.salespersons || []);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log("Current salespeople state:", salespeople);

  return (
    <>
      <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
      <h1>Salespeople</h1>
        <p>Number of Salespeople: {salespeople.length}</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Employee ID</th>
            </tr>
          </thead>
          <tbody>
            {salespeople.length > 0 ? (
              salespeople.map((salesperson) => (
                <tr key={salesperson.id}>
                  <td>{salesperson.first_name}</td>
                  <td>{salesperson.last_name}</td>
                  <td>{salesperson.employee_id}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No salespeople found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Salespeople;
