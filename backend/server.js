const app = require('./app');

const User = require('./database/models/user');

app.listen(3000, () => {
    console.log(`Server running on port 3000`);
});