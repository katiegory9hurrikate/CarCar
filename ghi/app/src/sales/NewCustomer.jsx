import { useState } from 'react';

function CustomerForm() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    phone_number: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'http://localhost:8090/api/customers/';
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        address: '',
        phone_number: ''
      });
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value;
    const inputName = e.target.name;
    setFormData({
      ...formData,
      [inputName]: value
    });
  }

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a New Customer</h1>
          <form onSubmit={handleSubmit} id="create-customer-form">
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.first_name} placeholder="First name" required type="text" name="first_name" id="first_name" className="form-control" />
              <label htmlFor="first_name">First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.last_name} placeholder="Last name" required type="text" name="last_name" id="last_name" className="form-control" />
              <label htmlFor="last_name">Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.address} placeholder="Address" required type="text" name="address" id="address" className="form-control" />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input onChange={handleFormChange} value={formData.phone_number} placeholder="Phone number" required type="text" name="phone_number" id="phone_number" className="form-control" />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
