import { config } from 'dotenv'
config()
import app from './app.js'
import connectToDb from './db/index.js';

app.get('/', (_, res) => {
    res.send("Hi")
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectToDb()
});
