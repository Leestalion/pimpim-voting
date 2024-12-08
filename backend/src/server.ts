import express, { Application, Response, Request } from 'express';
import cors from 'cors';
import { createTrip, createUserInTrip, getAllTrips, getAllUsersInTrip, getTripById, getTripResults, voteForTrip } from './services';
import { Trip } from './types';
import { tripNameExists } from './utils';

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
const apiRouter = express.Router();

// Endpoint to get all trips
apiRouter.get('/trips', (req: Request, res: Response) => {
    res.json(getAllTrips());
  });
  
// Endpoint to create a new trip
apiRouter.post('/trips', (req: Request, res: Response) => {
    const newTrip: Trip = req.body;

    if(!newTrip.name || !newTrip.securityCode) {
        res.status(400).send("Trip name and security code required");
        return;
    }

    if (tripNameExists(newTrip.name)) {
        res.status(400).send("Trip name already exists");
        return;
    }

    try {
        createTrip(newTrip);
        res.status(201).send("Trip created");
    } catch (error) {
        res.status(500).send("Error creating trip");
    }
});

// Enpoint to get a specific trip
apiRouter.get('/trip/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const trip = getTripById(id)
        res.status(200).json(trip);
    } catch (error) {
        res.status(500).send("Error fetching trip");
    }
});


// Endpoint to vote for a trip
apiRouter.post('/trips/:id/vote', (req: Request, res: Response) => {
    const { id } = req.params;
    const { username } = req.body;
    
    if (!username) {
        res.status(400).send("Username required");
        return;
    }

    try {
        voteForTrip(id, username);
        res.status(200).send("Vote recorded");
    } catch (error) {
        res.status(500).send("Error recording vote");
    }

    res.send("Vote recorded");
});

// create a user in a trip
apiRouter.post('/trips/:id/user', (req: Request, res: Response) => {
    const { username, securityCode } = req.body; // Expect { username }
    const { id } = req.params;

    if(!username || !securityCode) {
        res.status(400).send("Username and security code required");
        return;
    }

    try {
        createUserInTrip(id, username, securityCode);
        res.status(200).json({ message: "User added successfully" });
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});

// Endpoint to get all users in a trip
apiRouter.get('/trip/:id/users', (req: Request , res: Response) => {
    const { id } = req.params;

    try {
        const users = getAllUsersInTrip(id);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
    }
});

// Enpoint to get the results of a specific trip
apiRouter.get('/trip/:id/results', (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const results = getTripResults(id);
        res.status(200).json(results);
    } catch(error) {
        res.status(500).send("Error fetching results");
    }
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});