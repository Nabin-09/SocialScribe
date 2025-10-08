import mongoose from 'mongoose';

class DatabaseConnection {
  constructor() {
    this.connection = null;
  }

  async connect() {
    try {
      if (this.connection) {
        console.log('✅ Using existing database connection');
        return this.connection;
      }

      this.connection = await mongoose.connect(process.env.MONGODB_URI, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
      });

      console.log(`✅ MongoDB Connected: ${this.connection.connection.host}`);
      
      // Connection events
      mongoose.connection.on('disconnected', () => {
        console.log('⚠️ MongoDB disconnected');
      });

      mongoose.connection.on('error', (err) => {
        console.error('❌ MongoDB connection error:', err);
      });

      return this.connection;
    } catch (error) {
      console.error('❌ MongoDB connection failed:', error.message);
      process.exit(1);
    }
  }

  async disconnect() {
    if (this.connection) {
      await mongoose.disconnect();
      this.connection = null;
      console.log('✅ MongoDB disconnected');
    }
  }
}

export default new DatabaseConnection();
