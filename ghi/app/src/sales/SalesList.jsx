import { useEffect, useState } from "react";

function Sales() {
  const [sales, setSales] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  const getData = async () => {
    const response = await fetch("http://localhost:8090/api/sales");

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      const salesData = data.sales || [];
      setSales(salesData);
      calculateTotalSales(salesData);
    }
  };

  const calculateTotalSales = (salesData) => {
    const total = salesData.reduce((sum, sale) => sum + parseFloat(sale.price), 0);
    setTotalSales(total);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
        <h1>Sales</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Salesperson Employee ID</th>
              <th>Salesperson</th>
              <th>Customer</th>
              <th>Automobile VIN</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((sale) => {
              return (
                <tr key={sale.id}>
                  <td>{sale.salesperson.employee_id}</td>
                  <td>
                    {sale.salesperson.first_name} {sale.salesperson.last_name}
                  </td>
                  <td>
                    {sale.customer.first_name} {sale.customer.last_name}
                  </td>
                  <td>{sale.automobile.vin}</td>
                  <td>${parseFloat(sale.price).toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {sales.length > 0 && (
          <div className="text-end">
            <strong>Total Sales: <p>${totalSales.toFixed(2)}</p></strong>
          </div>
        )}
      </div>
    </>
  );
}

export default Sales;
