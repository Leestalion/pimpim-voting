const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // For parsing JSON request bodies

// Path to JSON file
const DATA_PATH = path.join(__dirname, "data.json");  // This will now be in the /data folder mounted from the volume

// Helper function to read/write data to JSON file
const readData = () => JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
const writeData = (data) => fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));

// API Routes

// Endpoint to get all trips
app.get('/trips', (req, res) => {
  const data = readData();
  res.json(data.trips || {});
});

// Endpoint to create a new trip
app.post('/trips', (req, res) => {
    const data = readData();
    const newTrip = req.body; // Expect { id, name, securityCode, users, votes }
    data.trips = { ...(data.trips || {}), [newTrip.id]: newTrip };
    writeData(data);
    res.status(201).send("Trip created");
});

// Endpoint to vote for a trip
app.post('/trips/:id/vote', (req, res) => {
    const { id } = req.params;
    const { username } = req.body; // Expect { username }
    const today = new Date().toISOString().split('T')[0];

    const data = readData();
    const trip = data.trips[id];
    if (!trip) {
        res.status(404).send("Trip not found");
        return;
    };

    trip.votes[today] = trip.votes[today] || {};
    trip.votes[today][username] = (trip.votes[today][username] || 0) + 1;
    writeData(data);

    res.send("Vote recorded");
});

// create a user in a trip
app.post('/trip/:id/user', (req, res) => {
    const { username, securityCode } = req.body; // Expect { username }
    const { id } = req.params;
    if(!username || !securityCode) {
        return res.status(400).send("Username and security code required");
    }

    // read the current users data
    const data = readData();
    const trip = data.trips[id];

    if (!trip) {
        return res.status(404).send("Trip not found");
    }

    if(trip.securityCode !== securityCode) {
        return res.status(403).send("Invalid security code");
    }

    // add the user if not already in the trip
    if(!trip.users.includes(username)) {
        trip.users.push(username);
        writeData(data);
        res.status(200).json({ message: "User added successfully" });
    } else {
        res.status(400).send("User already exists");
    }
});

// Endpoint to get all users in a trip
app.get('/trip/:id/users', (req, res) => {
    const { id } = req.params;
    const data = readData();
    const trip = data.trips[id];

    if (!trip) {
        return res.status(404).send("Trip not found");
    }

    res.status(200).json(trip.users);
});

// Enpoint to submit a vote for a user in a trip on a specific day
app.post('/trip/:id/vote', (req, res) => {
    const { username, date, vote } = req.body; // Expect { username, date, vote }
    const { id } = req.params;

    if (!username || !date || vote === undefined) {
        return res.status(400).send("Missing required fields");
    }

    // Read current data
    const data = readData();
    const trip = data.trips[id];

    if (!trip) {
        return res.status(404).send("Trip not found");
    }

    if(!trip.users.includes(username)) {
        return res.status(403).send("User not part of this trip");
    }

    // Initialize votes for the day if not present
    if(!trip.votes[date]) {
        trip.votes[date] = {};
    }

    trip.votes[date][username] = vote;

    writeData(data);
    res.status(200).json({ message: "Vote recorded successfully" });
});

// Enpoint to get the results of a specific trip
app.get('/trip/:id/results', (req, res) => {
    const { id } = req.params;

    const data = readData();
    const trip = data.trips[id];

    if (!trip) {
        return res.status(404).send("Trip not found");
    }

    console.log(trip.votes);

    res.status(200).json(trip.votes);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});