const Users = require('../models/users.models');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

exports.signUp = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur avec le rôle spécifié (ou le rôle par défaut)
    const user = new Users({
      email: email,
      password: hashedPassword,
      role: role || 'user' // Utiliser 'utilisateur' si aucun rôle spécifié
    });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    res.status(201).json({ message: "User saved in the database" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.logIn = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      userId: user.id,
      token: jwt.sign(
        { userId: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: '24h' })
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
