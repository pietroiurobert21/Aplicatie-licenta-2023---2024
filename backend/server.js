const express = require('express');
const app = express();
app.use(express.json());

const routes = require('./routes');
app.use('/routes', routes);

const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});