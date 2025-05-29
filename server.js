const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h1>Gestion LED - Formulaire Fournisseurs</h1>
    <p>Application déployée avec succès !</p>
    <p>Prêt pour le développement du formulaire intelligent.</p>
  `);
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});