import mongoose from 'mongoose';

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/rental_contracts';
    
    await mongoose.connect(mongoUri);
    
    console.log('✅ MongoDB connecté avec succès');
    
    mongoose.connection.on('error', (error) => {
      console.error('❌ Erreur MongoDB:', error);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB déconnecté');
    });
    
  } catch (error) {
    console.error('❌ Erreur de connexion à MongoDB:', error);
    process.exit(1);
  }
};