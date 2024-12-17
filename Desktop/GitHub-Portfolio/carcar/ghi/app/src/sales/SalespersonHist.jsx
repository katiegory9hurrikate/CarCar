import { useState, useEffect } from 'react';

function SalespersonHistory() {
  const [salespeople, setSalespeople] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState('');
  const [salesHistory, setSalesHistory] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    fetchSalespeople();
  }, []);

  useEffect(() => {
    if (selectedSalesperson) {
      fetchSalesHistory(selectedSalesperson);
    }
  }, [selectedSalesperson]);

  const fetchSalespeople = async () => {
    const response = await fetch('http://localhost:8090/api/salespeople/');
    if (response.ok) {
      const data = await response.json();
      setSalespeople(data.salespersons);
    }
  };

  const fetchSalesHistory = async (salespersonId) => {
    const response = await fetch(`http://localhost:8090/api/sales/`);
    if (response.ok) {
      const data = await response.json();
      const filteredSales = data.sales.filter(sale => sale.salesperson.id === parseInt(salespersonId));
      setSalesHistory(filteredSales);
      calculateTotalSales(filteredSales);
    }
  };

  const calculateTotalSales = (sales) => {
    const total = sales.reduce((sum, sale) => sum + parseFloat(sale.price), 0);
    setTotalSales(total);
  };

  const handleSalespersonChange = (event) => {
    setSelectedSalesperson(event.target.value);
  };

  return (
    <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
      <h1>Salesperson History</h1>
      <select
        value={selectedSalesperson}
        onChange={handleSalespersonChange}
        className="form-select mb-3 w-25"
      >
        <option value="">Select a salesperson</option>
        {salespeople.map(salesperson => (
          <option key={salesperson.id} value={salesperson.id}>
            {salesperson.first_name} {salesperson.last_name}
          </option>
        ))}
      </select>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesperson</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {salesHistory.map(sale => (
            <tr key={sale.id}>
              <td>{`${sale.salesperson.first_name} ${sale.salesperson.last_name}`}</td>
              <td>{`${sale.customer.first_name} ${sale.customer.last_name}`}</td>
              <td>{sale.automobile.vin}</td>
              <td>${sale.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {salesHistory.length > 0 && (
        <div className="text-end">
          <strong>Total Sales:<p>${totalSales.toFixed(2)}</p></strong>
        </div>
      )}
    </div>
  );
}

export default SalespersonHistory;
