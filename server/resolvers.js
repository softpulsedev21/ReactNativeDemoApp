const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');

const createToken = (user) => {
  return jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '7 days' });
};

const resolvers = {
  Query: {
    me: (_, __, { userId }) => {
      if (!userId) {
        throw new Error('Not authenticated');
      }
      return User.findById(userId);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      const token = createToken(user);

      return token;
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error('Invalid email or password');
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid email or password');
      }

      const token = createToken(user);

      return token;
    },
  },
};

module.exports = resolvers;
