const express = require('express');
const cors = require('cors');
const Nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const TOKEN = "18327037c5d455b9bb430f932f71fffe";

const transport = Nodemailer.createTransport(
  MailtrapTransport({
    token: TOKEN,
  })
);

const sender = {
  address: "hello@demomailtrap.com",
  name: "Masoandro Mood Clients",
};

const recipients = [
  "tendrytsilavinaakatsuki@gmail.com",
];

app.post('/api/contact', (req) => {
  const receivedData = req.body;

  console.log("Données reçues : ", receivedData);

  const { name, email, message } = receivedData;
  console.log("Nom:", name, "Email:", email, "Message:", message);

  transport
    .sendMail({
      from: sender,
      to: recipients,
      subject: "Commande ",
      html: `
      <h1 style="text-align: center; color: #4a47ff;">Masoandro Mood</h1>
<h2 style="text-align: center; color: #555;">Retour d’information</h2>
<div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 800px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
  <p style="font-size: 18px; font-weight: bold; color: #4a47ff; margin-bottom: 10px;">Nom: <span style="font-weight: normal; color: #555;">${name}</span></p>
  <p style="font-size: 18px; font-weight: bold; color: #4a47ff; margin-bottom: 10px;">Email: <span style="font-weight: normal; color: #555;">${email}</span></p>
  <p style="font-size: 18px; font-weight: bold; color: #4a47ff; margin-bottom: 10px;">Message: <span style="font-weight: normal; color: #555;">${message}</span></p>
</div>

<footer style="background-color: #333; color: #fff; text-align: center; padding: 20px 0; position: relative; bottom: 0; width: 100%;">
  <p style="font-size: 16px; margin: 0;">© 2024 Masoandro Mood</p>
</footer>

      `,
      category: "Commande",
    })
    .then(console.log)
    .catch(console.error);
});

app.post('/api/catalogue', (req, res) => {
  const receivedData = req.body;

  // Assurez-vous que `receivedData` est bien un objet et formatez-le si nécessaire
  const formattedData = JSON.stringify(receivedData, null, 2);

  transport
    .sendMail({
      from: sender,
      to: recipients,
      subject: "Commande",
      html: `
        <h1 style="text-align: center; color: #4a47ff;">Masoandro Mood</h1>
<h2 style="text-align: center; color: #555;">Détails de la commande:</h2>
        <pre>${formattedData}</pre>

        <footer style="background-color: #333; color: #fff; text-align: center; padding: 20px 0; position: relative; bottom: 0; width: 100%;">
  <p style="font-size: 16px; margin: 0;">© 2024 Masoandro Mood</p>
</footer>
      `,
      category: "Commande",
    })
    .then(
      () => {
        // Envoi réussi
        res.status(200).send("Commande envoyée avec succès.");
      },
      (error) => {
        // En cas d'erreur
        console.error("Erreur d'envoi du mail:", error);
        res.status(500).send("Erreur lors de l'envoi de la commande.");
      }
    );
});


app.listen(port, () => {
  console.log(`Serveur en écoute sur http://localhost:${port}`);
});

