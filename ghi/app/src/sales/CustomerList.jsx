import { useEffect, useState } from "react";

function CustomerList() {
  const [customers, setCustomers] = useState([]);

  const getData = async () => {
    const response = await fetch("http://localhost:8090/api/customers");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setCustomers(data.customers || []);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
        <h1>Customers</h1>
        <p>Number of Customers: {customers.length}</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => {
              return (
                <tr key={customer.id}>
                  <td>{customer.first_name}</td>
                  <td>
                    {customer.last_name}
                  </td>
                  <td>
                    {customer.phone_number}
                  </td>
                  <td>{customer.address}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default CustomerList;
