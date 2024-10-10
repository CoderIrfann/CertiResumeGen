import bcrypt from 'bcrypt';
import dbConnect from '@/utils/dbConnect';
import User from '../../models/userModel/user.model';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, username, email, password, confirmPassword } = req.body;

    // Basic validation
    if (!name || !username || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
      // Connect to the database
      await dbConnect();

      // Check if the email or username already exists
      const existingUser = await User.findOne({ $or: [{ email }, { username }] });

      if (existingUser) {
        return res.status(400).json({ message: 'Email or username already in use.' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user instance
      const newUser = new User({
        name,
        username,
        email,
        password: hashedPassword,
        createdAt: new Date(),
      });

      // Save the user to the database
      await newUser.save();

      // Send success response
      return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
