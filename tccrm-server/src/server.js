const { app } = require('./app');
const { env } = require('./config/env')

app.listen(env.PORT, () => {
    console.log(`Toll Collection API listening on port: ${env.PORT}`);
});
