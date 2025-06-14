# Anvaya

The Anvaya CRM app will focus on lead management with defined steps for each lead's lifecycle. We will assign sales agents to leads and allow users to add comments or updates to each lead.<br> Key features including sales agent assignment, lead stage tracking, and collaborative commenting for enhanced sales team coordination.

---

## Demo Link

[Live demo](https://anvaya-frontend.vercel.app/)

---

## Login

> **Guest**  
> Email: `guest@example.com`  
> Password: `guest12345`

---

## Quick Start

```
git clone https://github.com/Rekhakumari28/Anvaya_frontend.git
cd Anvaya_frontend
npm install
npm run dev
```

## Technologies

- React JS
- Bootstrap
- Redux 
- Chart.js
- Node.js
- Express
- MongoDB
- JWT

## Demo Video

Explore a 5-6 minute walkthrough showcasing all major features of this app.
[Loom Video Link](https://www.loom.com/share/f22faeb879494c57b5605de4b241f041?sid=6da5a8ec-8f96-42b5-88b6-91a36f4c6929)

## Features

**Home**

- All leads are displayed in one section
- A button is available to quickly add a new lead
- Leads are organized and grouped based on their current status (e.g., New, In Progress, Won, Lost)
- A filter option allows users to view leads by specific statuses

**Lead Detail**

- Lead Information Displays Name, Source, Sales Agent, Status, Time to Close, Priority, Tags
- Displays all comments associated with the lead
- A simple input form to allow users to add new comments and collaborate on lead progress

**Leads Overview**

- Displays all leads in a tabular format with the following columns Lead Name, Status, Sales Agent Name, Source, Priority, Time to Close
- Filter, sort, and reset leads with ease, and quickly add new leads using the "Add Lead" button

**Sales Agent**

- All sales agents are displayed in a structured grid layout
- Each card or grid item includes Agent Name, Email Address, Number of Leads Assigned
- A "View More" button to see detailed agent information
- A dedicated "Add New Agent" button allows quick onboarding of new sales agents 

**Leads by Sales Agent**

- Displays the selected sales agent's name at the top
- Filters & Reset
- Assigned lead list is displayed in a table showing lead name, status, priority, and time to close

**Report**

- It shows charts including 
- Total Closed and Pipeline Leads (Pai Chart)
- Leads Closed by Sales Agent (Bar Chart).
- Lead Status Distribution (Pai Chart)

**Setting**

- Displays a signout button
- Edit and Delete Lead

## API Reference

### **GET /api/leads**<br>

Displays a list of all leads.<br>
Sample API response<br>

```[{_id, name, source, salesAgent, status, tags, timeToClose, priority}, ...]```

### **GET /api/agents**<br>

Fetch and display Sales Agents<br>
Sample API response<br>

```{_id, name, email}```

### **GET /api/leads/:leadId/comments**<br>

Get all comments for lead<br>
Sample API response<br>

```{_id, title, price, images}```

### **POST /api/user/signup**<br>

Register a new user<br>
Sample API response<br>
```{ userId, token }```


## Contact

Encountered a problem or have a suggestion? Reach out at rekha.kumari1928@gmail.com.    
