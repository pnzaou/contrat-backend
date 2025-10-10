import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import contractRoutes from './routes/contract.routes';
import { errorHandler } from './middleware/errorHandler';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const FRONT_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';

const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
    // autorise les requêtes sans origin (ex: same-origin, curl), sinon compare
    if (!origin) return callback(null, true);
    if (origin === FRONT_ORIGIN) return callback(null, true);
    // tu peux étendre avec un tableau d'origines si besoin
    return callback(new Error('Origin non autorisée par CORS'), false);
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
};

app.use(cors(corsOptions));

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// debug: log origin
app.use((req, res, next) => {
  console.log('Origin header:', req.headers.origin);
  next();
});

// Routes
app.use('/api/contracts', contractRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Bienvenue sur l\'API de gestion des contrats', status: 'OK', timestamp: new Date().toISOString() });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use(errorHandler);

// Démarrage du serveur
const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur le port ${PORT}`);
      console.log(`📍 Environnement: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('❌ Erreur au démarrage du serveur:', error);
    process.exit(1);
  }
};

startServer();

// Gestion propre de l'arrêt
process.on('SIGINT', async () => {
  console.log('\n⏳ Arrêt du serveur...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⏳ Arrêt du serveur...');
  process.exit(0);
});