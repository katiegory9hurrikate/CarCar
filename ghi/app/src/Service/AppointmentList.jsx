import React, { useEffect, useState } from 'react';

function AppointmentList() {
    const [appointments, setAppointments] = useState([]);

    async function fetchAppointments() {
        const response = await fetch('http://localhost:8080/api/appointments/');
        if (response.ok) {
            const data = await response.json();
            setAppointments(data.appointments);
        } else {
            console.error('Error fetching appointments');
        }
    }

    useEffect(() => {
        fetchAppointments();
    }, []);

    if (!appointments) {
        return null;
    }

    const handleCancel = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/cancel/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            fetchAppointments();
        }
    };

    const handleFinish = async (id) => {
        const response = await fetch(`http://localhost:8080/api/appointments/${id}/finish/`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            fetchAppointments();
        }
    };

    return (
        <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
        <h1>Service Appointments</h1>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>VIP Status</th>
                    <th>Customer</th>
                    <th>Date & Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map((appointment) => (
                    <tr key={appointment.id}>
                        <td>{appointment.vin}</td>
                        <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                        <td>{appointment.customer}</td>
                        <td>{new Date(appointment.date_time).toLocaleString()}</td>
                        <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                        <td>{appointment.reason}</td>
                        <td>{appointment.status}</td>
                        <td>
                            <button onClick={() => handleCancel(appointment.id)} className="btn btn-danger p-1">Cancel</button>
                            <button onClick={() => handleFinish(appointment.id)} className="btn btn-success p-1">Finish</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
}

export default AppointmentList;
