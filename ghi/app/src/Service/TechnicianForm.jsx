import { useState, useEffect } from 'react'

function TechnicianForm() {
  const [technicians, setTechnicians] = useState([])
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    employee_id: '',
  })

  const getData = async () => {
    const url = 'http://localhost:8080/api/technicians/'
    const response = await fetch(url)

    if (response.ok) {
      const data = await response.json()
      console.log(data)
      setTechnicians(data.techs)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()

    const technicianUrl = 'http://localhost:8080/api/technicians/'

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      }
    }

    const response = await fetch(technicianUrl, fetchConfig)

    if (response.ok) {
      setFormData({
        first_name: '',
        last_name: '',
        employee_id: '',
      })
    }
  }

  const handleFormChange = (e) => {
    const value = e.target.value
    const inputName = e.target.name
    setFormData({
      ...formData,
      [inputName]: value
    })
  }

  return (
    <div className='row'>
      <div className='offset-3 col-6'>
        <div className='shadow p-4 mt-4'>
          <h1>Create a New Technician</h1>
          <form onSubmit={handleSubmit} id='create-technician-form'>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.first_name} placeholder='First Name' required type='text' name='first_name' id='first_name' className='form-control' />
              <label htmlFor='first_name'>First Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.last_name} placeholder='Last Name' required type='text' name='last_name' id='last_name' className='form-control' />
              <label htmlFor='last_name'>Last Name</label>
            </div>
            <div className='form-floating mb-3'>
              <input onChange={handleFormChange} value={formData.employee_id} placeholder='Employee ID' required type='text' name='employee_id' id='employee_id' className='form-control' />
              <label htmlFor='employee_id'>Employee ID</label>
            </div>
            <button className='btn btn-primary' style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default TechnicianForm
