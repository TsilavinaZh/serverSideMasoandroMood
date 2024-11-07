const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const appendDataToFile = (filePath, data, res, successMessage) => {
    fs.appendFile(filePath, `${JSON.stringify(data)}\n`, (err) => {
        if (err) {
            console.error(`Erreur lors de l'enregistrement dans ${filePath}:`, err);
            return res.status(500).json({ message: 'Erreur lors de l\'enregistrement du fichier' });
        }
        res.json({ message: successMessage, data });
    });
};

app.post('/api/contact', (req, res) => {
    const receivedData = req.body;
    appendDataToFile('contact.json', receivedData, res, 'Données de contact reçues avec succès');
});

app.post('/api/catalogue', (req, res) => {
    const receivedData = req.body;
    appendDataToFile('catalogue.json', receivedData, res, 'Données de catalogue reçues avec succès');
});

const readDataFromFile = (filePath, res, successMessage) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Erreur de lecture du fichier ${filePath}:`, err);
            return res.status(500).json({ message: 'Erreur lors de la lecture du fichier' });
        }
        
        const jsonData = data.split('\n').filter(Boolean).map(line => JSON.parse(line));
        res.json({ message: successMessage, data: jsonData });
    });
};

app.get('/api/contact-data', (req, res) => {
    readDataFromFile('contact.json', res, 'Données du contact');
});

app.get('/api/catalogue-data', (req, res) => {
    readDataFromFile('catalogue.json', res, 'Données du catalogue');
});

app.listen(port, () => {
    console.log(`Serveur en écoute sur http://localhost:${port}`);
});










