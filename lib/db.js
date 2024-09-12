import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Subscription = mongoose.models.Subscription || mongoose.model('Subscription', subscriptionSchema);

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1) return;

  return mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

export default Subscription;
