const mongoose = require("mongoose");

// Définition du schéma pour l'utilisateur
const newsletterSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
});

// Modèle Mongoose pour l'utilisateur
const Newsletter = mongoose.model("Newsletter", newsletterSchema);

// Making the whole function async
async function addUser(req, res) {
  try {
    // Récupère les informations de l'utilisateur qui va être inscrit
    const { userEmail } = req.body;

    // Vérifie si l'email est défini et n'est pas vide
    if (!userEmail) {
      return res.status(400).json({
        status: "No_Email",
        message: "User email is missing or empty",
      });
    }

    // Vérifie si un utilisateur avec le même email existe déjà
    const existingUser = await newsletter.findOne({ email: userEmail });
    if (existingUser) {
      return res.status(404).json({
        status: "User_Error",
        message: "Utilisateur existant",
      });
    }

    // Création de l'utilisateur dans la DB
    await newsletter.create({
      email: userEmail,
    });

    res.status(200).json({
      status: "Success",
      message: "User successfully added",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "Error",
      message: "Server Error",
    });
  }
}

module.exports = Newsletter;
