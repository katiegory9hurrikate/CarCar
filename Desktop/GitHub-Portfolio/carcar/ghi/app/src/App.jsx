import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Sales from "./sales/SalesList";
import SalesForm from "./sales/NewSale";
import CustomerList from "./sales/CustomerList";
import CustomerForm from "./sales/NewCustomer";
import Salespeople from "./sales/SalespeopleList";
import SalespersonForm from "./sales/NewSalesperson";
import SalespersonHistory from "./sales/SalespersonHist";
import AutomobileList from "./inventory/InventoryList";
import AutomobileForm from "./inventory/NewInventory";
import ManufacturerList from "./inventory/ManufacturerList";
import ManufacturerForm from "./inventory/NewManufacturer";
import UnsoldAutomobileList from "./inventory/UnsoldAutomobileList";
import ModelForm from "./inventory/NewModel";
import ModelList from "./inventory/ModelList";
import TechnicianList from "./Service/TechnicianList";
import TechnicianForm from "./Service/TechnicianForm";
import AppointmentForm from "./Service/AppointmentForm";
import AppointmentList from "./Service/AppointmentList";
import ServiceHistory from "./Service/ServiceHistory";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />

		  <Route path="/technicians">
			<Route index element={<TechnicianList />} />
			<Route path="new" element={<TechnicianForm />} />
		  </Route>

          <Route path="/appointments">
            <Route index element={<AppointmentList />} />
            <Route path="new" element={<AppointmentForm />} />
			<Route path="history" element={<ServiceHistory />} />
          </Route>

		  <Route path="/sales">
			<Route index element={<Sales />} />
			<Route path="new" element={<SalesForm />} />
		</Route>

		<Route path="/inventory">
			<Route index element={<AutomobileList />} />
			<Route path="unsold" element={<UnsoldAutomobileList />} />
			<Route path="new" element={<AutomobileForm />} />
		</Route>

		<Route path="/manufacturers">
			<Route index element={<ManufacturerList />} />
			<Route path="new" element={<ManufacturerForm />} />
		</Route>

		<Route path="/models">
			<Route index element={<ModelList />} />
			<Route path="new" element={<ModelForm />} />
		</Route>

		<Route path="/customers">
			<Route index element={<CustomerList />} />
			<Route path="new" element={<CustomerForm />} />
		</Route>

		<Route path="/salespeople">
			<Route index element={<Salespeople />} />
			<Route path="new" element={<SalespersonForm />} />
			<Route path="history" element={<SalespersonHistory />} />
		</Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
