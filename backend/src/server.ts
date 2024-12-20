import express, { Application } from 'express';
import cors from 'cors';

const app: Application = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes



// // Endpoint to vote for a trip
// apiRouter.post('/trips/:id/vote', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { username } = req.body;
    
//     if (!username) {
//         res.status(400).send("Username required");
//         return;
//     }

//     try {
//         voteForTrip(id, username);
//         res.status(200).send("Vote recorded");
//     } catch (error) {
//         res.status(500).send("Error recording vote");
//     }

//     res.send("Vote recorded");
// });

// // create a user in a trip
// apiRouter.post('/trips/:id/user', (req: Request, res: Response) => {
//     const { username, securityCode } = req.body; // Expect { username }
//     const { id } = req.params;

//     if(!username || !securityCode) {
//         res.status(400).send("Username and security code required");
//         return;
//     }

//     try {
//         createUserInTrip(id, username, securityCode);
//         res.status(200).json({ message: "User added successfully" });
//     } catch (error) {
//         res.status(500).send("Error creating user");
//     }
// });


// Import trip routes
import { tripRouter, voteRouter, userRouter } from './routes';

app.use('/api', tripRouter);
app.use('/api', userRouter);
app.use('/api', voteRouter);

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});