import React, { useEffect, useState } from 'react';

function AppointmentForm() {
    const [technicians, setTechnicians] = useState([]);

    const [appointmentData, setAppointmentData] = useState({
        customer: '',
        vin: '',
        set_date: '',
        set_time: '',
        reason: '',
        technician: '',
        status: 'scheduled'
    });

    const fetchData = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            setTechnicians(data.technicians);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("Submitting form with data:", appointmentData);

        try {
            const url = 'http://localhost:8080/api/appointments/';
            const { set_date, set_time, ...rest } = appointmentData;
            const date_time = `${set_date}T${set_time}:00Z`;
            const dataToSend = { ...rest, date_time };

            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(dataToSend),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log("Appointment created successfully");
                setAppointmentData({
                    customer: '',
                    vin: '',
                    set_date: '',
                    set_time: '',
                    reason: '',
                    technician: '',
                    status: 'scheduled'
                });
                alert('Appointment created successfully!');
            } else {
                const errorData = await response.json();
                console.error('Error creating appointment:', errorData);
                alert('Failed to create appointment.');
            }
        } catch (error) {
            console.error('Error creating appointment:', error);
            alert('Failed to create appointment.');
        }
    }

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        console.log(`Changing ${name} to ${value}`);
        setAppointmentData({
            ...appointmentData,
            [name]: value,
        });
    }

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a Service Appointment</h1>
                    <form onSubmit={handleSubmit} id="create-service-appointment">
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Customer" required type="text" value={appointmentData.customer} name="customer" id="customer" className="form-control" />
                            <label htmlFor="customer">Customer</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleFormChange} required name="technician" value={appointmentData.technician} id="technician" className="form-select">
                                <option value='' disabled>Select a Technician</option>
                                {
                                    technicians.map((tech) => (
                                        <option key={tech.id} value={tech.id}>
                                            {`${tech.first_name} ${tech.last_name}`}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="VIN" required type="text" value={appointmentData.vin} name="vin" id="vin" className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Date" required type="date" value={appointmentData.set_date} name="set_date" id="set_date" className="form-control" />
                            <label htmlFor="set_date">Date</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Time" required type="time" value={appointmentData.set_time} name="set_time" id="set_time" className="form-control" />
                            <label htmlFor="set_time">Time</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFormChange} placeholder="Reason" required type="text" value={appointmentData.reason} name="reason" id="reason" className="form-control" />
                            <label htmlFor="reason">Reason</label>
                        </div>
                        <button className="btn btn-primary" style={{ color: '#198754', backgroundColor: '#ffffff', borderColor: '#198754' }}>Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AppointmentForm;
