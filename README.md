# CarCar

## Team as of September 2024:
* Micah - Service
* Katie - Sales

## Team as of October 2024:
* Katie

## Pending updates:
#### Add/Update search/filter fields on
- [ ] Customer List
- [ ] Salesperson List
- [ ] Salesperson History
- [ ] Service History
- [ ] Appointments List
- [ ] Technician List
- [ ] Sales History
#### Add "Create New" forms to
- [ ] Customer List
- [ ] Salesperson List
- [ ] Appointments List
- [ ] Technician List
- [ ] Manufacturer List
- [ ] Model List
#### Add CSV bulk upload to
- [ ] Inventory List
- [ ] Customer List
- [ ] Appointment List
- [ ] Technician List
- [ ] Salesperson List
- [ ] Sales History
#### Add "Edit" & "Delete" options to
- [ ] Inventory items
- [ ] Customers
- [ ] Salespeople
- [ ] Technicians
- [ ] Sales History
- [ ] Appointments
- [ ] Models
- [ ] Manufacturers

#### Other
- [ ] Add local state filters for color groups on inventory list - this will allow vehicles to be listed with their trademarked colors but still show up in searches based on the primary color group. Ex. "Plum Crazy Purple" would show up when a user selects "Purple" as a color filter and "Pink Pizzaz" would show up when a user selects "red" as the color group filter.

- [ ] Add "Schedule Service" button to entries on the Customer List. This option will generate a modal pop-up with the New Appointment form and will auto-populate the customer's name into the Customer field.



## How to Run this App

#### Software:

- Docker Desktop (req.)
- Insomnia (or similar)
- VS Code or another code editing program
- Web Browser (Firefox or Chrome preferred)

#### Setup:

- [ ] Fork Git repository at https://github.com/katiegory9hurrikate/CarCar into your GitHub account.
- [ ] Copy the HTTP link for the forked respository from __your__ GitLab profile.
- [ ] In your terminal/command prompt on your desktop cd into the directory you want to run the project from.
- [ ] Once in the desired directory, clone the project to your computer using the `git clone` command.
- [ ] Once cloned, cd into the project-beta directory and run the following commands:
    * `docker volume create beta-data`
    * `docker compose build`
    * `docker compose up`
    * `code .`
- [ ] Familiarize yourself with the code. Use Insomnia (or similar) to test APIs. To view and test the front-end, navigate to http://localhost:5173/ using a web browser.
(note: if the docker build doesn't work for some reason, close it down, delete/prune the containers, images, and volumes and try again. The ole turn it off and back on again trick is still relevant.)


## Diagram
<img src="readmediagram.png"/>


## API Documentation
Use http://localhost:5173/ to view any adjustments made to the files on the front end. If you are on a Mac changes should automatically update in the front-end. If you are on a Windoze machine, you may need to stop and restart the containers with each change. We reccomend creating a new branch in your GitLab repository to work from if you want to make any changes to the files for commiting any updates to the original project.

### URLs and Ports
**Inventory**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8100/api/automobiles/</td>
        <td>GET</td>
        <td>List all Inventory</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/automobiles/:vin/</td>
        <td>GET</td>
        <td>Show details for specific inventory item</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/automobiles/</td>
        <td>POST</td>
        <td>Create new inventory item</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/automobiles/:vin/</td>
        <td>PUT</td>
        <td>Update a specific inventory item</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/automobiles/:vin/</td>
        <td>DELETE</td>
        <td>Remove a specific inventory item</td>
    </tr>
</tbody>
</table>

**Manufacturers**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8100/api/manufacturers/</td>
        <td>GET</td>
        <td>List all Manufacturers</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/:id/</td>
        <td>GET</td>
        <td>Show a specific manufacturer</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/</td>
        <td>POST</td>
        <td>Create new manufacturer</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/:id/</td>
        <td>PUT</td>
        <td>Update a specific manufacturer</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific manufacturer</td>
    </tr>
</tbody>
</table>

**Models**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8100/api/models/</td>
        <td>GET</td>
        <td>List all models</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/models/:id/</td>
        <td>GET</td>
        <td>Show details of a specific model</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/models/</td>
        <td>POST</td>
        <td>Create new model</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/models/:id/</td>
        <td>PUT</td>
        <td>Update a specific model</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/models/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific model</td>
    </tr>
</tbody>
</table>

**Sales**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8090/api/sales/</td>
        <td>GET</td>
        <td>List all sales</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/sales/:id/</td>
        <td>GET</td>
        <td>Get a specific sale</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/sales/</td>
        <td>POST</td>
        <td>Create new sale</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/sales/:id/</td>
        <td>PUT</td>
        <td>Update a specific sale</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/sales/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific sale</td>
    </tr>
</tbody>
</table>

**Salespeople**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8090/api/salespeople/</td>
        <td>GET</td>
        <td>List all salespeople</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/salespeople/:id/</td>
        <td>GET</td>
        <td>Get a specific salesperson</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/salespeople/</td>
        <td>POST</td>
        <td>Create new salesperson</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/salespeople/:id/</td>
        <td>PUT</td>
        <td>Update a specific salesperson</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/salespeople/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific salesperson</td>
    </tr>
</tbody>
</table>

**Customers**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8090/api/customers/</td>
        <td>GET</td>
        <td>List all customers</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/customers/:id/</td>
        <td>GET</td>
        <td>Get a specific customer</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/customers/</td>
        <td>POST</td>
        <td>Create new customer</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/customers/:id/</td>
        <td>PUT</td>
        <td>Update a specific customer</td>
    </tr>
    <tr>
        <td>http://localhost:8090/api/customers/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific customer</td>
    </tr>
</tbody>
</table>

**Service Appointments**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8080/api/appointments/</td>
        <td>GET</td>
        <td>List all appointments</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/appointments/</td>
        <td>POST</td>
        <td>Create new appointment</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/appointments/:id/cancel/</td>
        <td>PUT</td>
        <td>Update a specific appointment status to "cancelled"</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/:id/finish/</td>
        <td>PUT</td>
        <td>Update a specific appointment status to "finished"</td>
    </tr>
    <tr>
        <td>http://localhost:8100/api/manufacturers/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific appointment</td>
    </tr>
</tbody>
</table>

**Technicians**
 <table>
 <thead>
    <tr>
        <th> URL </th>
        <th> Method </th>
        <th> Action </th>
    </tr>
</thead>
<tbody>
    <tr>
        <td>http://localhost:8080/api/technicians</td>
        <td>GET</td>
        <td>List all technicians</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/technicians/:id/</td>
        <td>GET</td>
        <td>Get a specific technician</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/technicians/</td>
        <td>POST</td>
        <td>Create new technician</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/technicians/:id/</td>
        <td>PUT</td>
        <td>Update a specific technician</td>
    </tr>
    <tr>
        <td>http://localhost:8080/api/technicians/:id/</td>
        <td>DELETE</td>
        <td>Remove a specific technician</td>
    </tr>
</tbody>
</table>

## Value Objects
| AutomobileVO | Used to identify Vehicles in Inventory via their VIN (Vehicle Identification Number) and their sold/unsold status |

## Inventory microservice

* Initial API for the CarCar application that holds a database for the Sales and Service microservices to work with. Its key components are:

 <table>
 <thead>
    <tr>
        <th> VIEWS </th>
        <th> MODELS </th>
        <th> ENCODERS </th>
    </tr>
</thead>
 <tbody>
    <tr>
        <td>
        api_automobiles<br/>
        api_automobile<br/>
        api_manufacturers<br/>
        api_manufacturer<br/>
        api_vehicle_models<br/>
        api_vehicle_model
        </td>
        <td>
        Manufacturer<br/>
        VehicleModel<br/>
        Automobile
        </td>
        <td>
        ManufacturerEncoder<br/>
        VehicleModelEncoder<br/>
        AutomobileEncoder
        </td>
    </tr>
 </tbody>
 </table>

## Service microservice

* This API allows connects to the Inventory API in order to identify Service customers that have purchased a vehicle through the dealership via the VIN of the vehicle they have brought in to be serviced. Its key components are:

 <table>
 <thead>
    <tr>
        <th> VIEWS </th>
        <th> MODELS </th>
        <th> ENCODERS </th>
    </tr>
</thead>
 <tbody>
    <tr>
        <td>
        api_list_technicians<br/>
        api_delete_technician<br/>
        api_list_appointments<br/>
        api_delete_appointment<br/>
        api_finish_apppointment<br/>
        api_cancel_appointment
        </td>
        <td>
        Technician<br/>
        AutomobileVO<br/>
        Appointment
        </td>
        <td>
        TechnicianEncoder<br/>
        AppointmentEncoder<br/>
        AutomobileVOEncoder
        </td>
    </tr>
 </tbody>
 </table>

## Sales microservice

* This API allows connects to the Inventory API in order to sell vehicles in inventory and connect those sales to customers and salespeople. This also allows customers to be identified as VIPs in the Service API when a vehicle is marked as sold. Its key components are:

 <table>
 <thead>
    <tr>
        <th> VIEWS </th>
        <th> MODELS </th>
        <th> ENCODERS </th>
    </tr>
</thead>
 <tbody>
    <tr>
        <td>
        api_list_salespeople<br/>
        api_show_salesperson<br/>
        api_list_customers<br/>
        api_show_customer<br/>
        api_list_sales<br/>
        api_show_sale
        </td>
        <td>
        Salesperson<br/>
        Customer<br/>
        Sale<br/>
        AutomobileVO
        </td>
        <td>
        SalespersonEncoder<br/>
        CustomerEncoder<br/>
        SalesDetailEncoder<br/>
        AutomobileVOEncoder
        </td>
    </tr>
 </tbody>
 </table>
