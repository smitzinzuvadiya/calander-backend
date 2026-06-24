import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import eventRoutes from './routes/events.js';

const app = express();

app.use(cors({
    origin: (origin, callback) => {
        // Automatically allow any origin (mirrors the requesting origin in the response)
        // to prevent deployment URL and local URL CORS blocks.
        callback(null, true);
    },
    credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);

app.get('/', (req, res) => {
    res.json({ message: 'Calendar API is running' });
});

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Mongodb connected!');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    });

export default app;