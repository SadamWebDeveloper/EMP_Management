# Employee Management System

This project includes a frontend (built with Vite and React) and a backend (built with Node.js and Express) to process Secret Santa assignments based on uploaded CSV files. Users can upload an employee list and last year’s Secret Santa results, and the application will generate and allow download of the new Secret Santa assignments for the current year.

<br>

## Git Clone Instructions
To get started with the project, follow these steps:

**Clone the repository:**

<ul>
  <li><b>Clone command:</b> git clone https://github.com/SadamWebDeveloper/EMP_Management.git</li>
  <li> cd EMP_Management/Frontend</li>
  <li>npm install <b>Or</></b> pnpm install</li>
    <li><b>Run the project</b> npm run dev</li>
</ul>
<br>
<ul>
  <li><b>Backend setup:</b> cd ../Backend</li>
  <li> cd EMP_Management/Frontend</li>
  <li>npm install <b>Or</></b> pnpm install</li>
</ul>
<br>
<ul>
  <li><b>Set up the .env file:</b></li>
  <li>PORT=3030</li>
  <li>DB_HOST=localhost</li>
    <li>DB_USER=root</li>
    <li>DB_PASSWORD=password</li>
    <li>DB_NAME=employee_db</li>
    <li><b>Run the project</b> npm run start</li>
</ul>
<br>
<ul>
  <li><b>Frontend Configuration:</b></li>
  <li><b>Go to the:</b>Frontend/src/components/common/constants.js</li>
  <li>Choose Port and Secret Key as per your security </li>

</ul>

## Technologies Used
<b>Purpose of the Application</b>
<br>
<p>The <b>Employee Management System</b> is built to manage employee data such as their name, age, position, and department. The primary purpose of building this application is to demonstrate how to develop a backend system using <b>pure Node.js</b> without relying on any external libraries (other than necessary packages like MySQL client). The backend follows a simple, custom-built architecture to handle CRUD operations for employee records.</p>
<br>
<b>Technology Stack</b>
<b>Frontend</b>
<ul>
  <li><b>Vite</b> - Development build tool for frontend</li>
  <li><b>React</b> - Library for building user interfaces</li>
</ul>

<b>Backend</b>
<ul>
  <li><b>Node.js</b> - Pure Node.js (No external frameworks like Express)</li>
  <li><b>Database</b> - MySQL</li>
</ul>
<br>

## Api Documentation

### Request methods

The request method is the way we distinguish what kind of action our endpoint is being "asked" to perform. For example, `GET` pretty much gives itself. But we also have a few other methods that we use quite often.

| Method   | Description                                  |
| -------- | ----------------------------------------     |
| `GET`    | Retrieve data (single or collection).        |
| `POST`   | Create new data (e.g., an employee record).  |
| `PUT`    | Update existing data.                        |
| `DELETE` | Delete existing data.                        |

### Examples

Now that we’ve learned about the anatomy of our endpoints and the different request methods that we should use, it’s time for some examples:

| Method   | URL                                      | Description                              |
| -------- | ---------------------------------------- | ---------------------------------------- |
| `GET`    | `/api/employees`                         | Retrieve all employees.                  |
| `GET`    | `/api/employees/id`                      | Retrieve a specific employee.            |
| `POST`   | `/api/employees`                         | Create a new employee.                   |
| `PUT`    | `/api/employees/id`                      | Update an existing employee.             |
| `DELETE` | `/api/employees/id`                      | Delete an employee.                      |

### Examples

Just to round it all off, here’s a few examples of how our response will return depending on whether you’re about to return a single item, a collection or a paginated result set.
<b>GET</b>
<code>http://localhost:3030/api/employees</code>

```
{
  "statusCode": 200,
  "message": "Employees List",
  "data": {
    "employees": [
      {
        "id": 0,
        "name": "abc",
        "age": 21,
        "position": "Software Engineer",
        "department": "Software",
        "created_at": "2024-11-29:17:58.000",
        "updated_at": "2024-11-29:49:01.000"
      },
       {
        "id": 2,
        "name": "abcxxxxxx",
        "age": 21xx,
        "position": "Software Engineerxxxxxx",
        "department": "Softwarexxxxx",
        "created_at": "2024-11-29:17:58.000",
        "updated_at": "2024-11-29:49:01.000"
      },
      .....
    ]
  }
}
```
<br>
<b>GET</b>
<code>http://localhost:3030/api/employees/2</code>

```
{
  "statusCode": 200,
  "message": "Employee detail availabale",
  "data": {
    "id": 2,
    "name": "xxxx",
    "age": 20,
    "position": "Software Engineerxxxx",
    "department": "department xxxxx.",
    "created_at": "2024-11-29:20:13.000",
    "updated_at": "2024-11-29:20:46.000"
  }
}
```
<br>
<b>POST</b>
<code>http://localhost:3030/api/employees</code>

<b>params<b>
```
{
  "name": "abc123",
  "age": 20,
  "position": "IOS Developer",
  "department": "Development."
}
```
<b>Response<b>
```
{
  "statusCode": 200,
  "message": "Employee detail added successfully"
}
```


<b>PUT</b>
<code>http://localhost:3030/api/employees/2</code>

<b>params<b>
```
{
  "name": "New Data",
  "age": 20,
  "position": "Software Engineer",
  "department": "Development."
}
```
<b>Response<b>
```
{
  "statusCode": 200,
  "message": "Employee detail availabale",
  "data": {
    "id": 2,
    "name": "New Data",
    "age": 20,
    "position": "Software Engineer",
    "department": "Development.",
    "created_at": "2024-11-29:20:13.000",
    "updated_at": "2024-11-29:45:45.000"
  }
}
```
<br>
<b>DELETE</b>
<code>http://localhost:3030/api/employees/2</code>

<b>Response<b>
```
{
  "statusCode": 200,
  "message": "Employee detail deleted successfully"
}
```
<b>Implement Custom Error Handling Function<b>

<b>POST</b>
<code>http://localhost:3030/api/employees</code>

<b>params<b>
```
{
  "name": "abc123",
  "age": 20
}
```
<b>Response<b>
```
{
  "statusCode": 203,
  "message": {
    "position": "position is required.",
    "department": "department is required."
  }
}
```

## Project Structure

<pre>
EMP_Management/
├── Frontend/                   # Frontend files (React + Vite)
│   ├── src/                    # Source files
│   ├── public/                 # Public assets
│   └── index.html              # Main HTML file
├── Backend/                    # Backend files (Node.js)
│   ├── config/                 # Configuration files
│   ├── controllers/            # Request handlers
│   ├── models/                 # Database models
│   ├── routes/                 # API routes
│   ├── utils/                  # Utility functions
│   ├── .env                    # Environment configuration
│   ├── app.js                  # Main application file
│   └── server.js               # Server setup
└── README.md                   # Project documentation
</pre>



