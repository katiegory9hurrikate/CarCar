import { Fragment, useEffect, useState } from 'react';

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchAppointments = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/appointments/');
            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments || []);
            } else {
                setError('Error fetching appointments');
            }
        } catch (error) {
            setError('Error: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredAppointments = appointments.filter((appointment) =>
        appointment.vin.toLowerCase().trim().includes(searchInput.toLowerCase().trim())
    );

    return (
        <Fragment>
            <div className="px-4 pt-4 mt-4 pb-4 mb-4 mt-0">
            <h1>Service History</h1>
            <input
                type="text"
                placeholder="Search by VIN (Vehicle Identification Number)"
                value={searchInput}
                onChange={handleSearchInputChange}
                className="form-control mb-3 w-50"
            />
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">VIN</th>
                            <th scope="col">Is VIP?</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Date & Time</th>
                            <th scope="col">Technician</th>
                            <th scope="col">Reason</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.is_vip ? 'Yes' : 'No'}</td>
                                <td>{appointment.customer}</td>
                                <td>{new Date(appointment.date_time).toLocaleString()}</td>
                                <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                                <td>{appointment.reason}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            </div>
        </Fragment>
    );
}

export default ServiceHistory;
