import { connectToDatabase } from '../../lib/db';
import Subscription from '../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    try {
      // Connect to the database
      await connectToDatabase();

      // Save to MongoDB
      const newSubscription = new Subscription({ email });
      await newSubscription.save();

      // Send a response
      res.status(201).json({ message: 'Subscribed successfully' });
    } catch (err) {
      console.error('Error:', err);
      res.status(500).json({ message: 'Subscription failed', error: err.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
