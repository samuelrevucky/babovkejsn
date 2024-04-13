import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import { Client } from 'pg';
import jwt, { Secret } from 'jsonwebtoken';


const app = express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.listen(8000);

const client = new Client();
client.connect();


app.post('/api/authenticate', (req, res) => {
    console.log(req.body);
    const { mail, password } = req.body;
    client
    .query(`select * from users where mail = $1`, [mail])
    .then(dbres => {
        if (dbres.rowCount === 0 || dbres.rows[0]['password'] !== password) {
            console.log("som zle");
            res.status(403).json({ authenticated: false, message: 'Authentication failed' });
        }
        else {
            const user = dbres.rows[0];
            delete user.password;

            const token = jwt.sign(user, process.env.SECRET as Secret, { expiresIn: "10m" });
            console.log("som tu");
            res
            .status(200)
            .cookie("authtoken", token, {
                httpOnly: true,
                sameSite: false,
                secure: true,
                maxAge: 10 * 60 * 1000,
            })
            .json({ authenticated: true, role: user.role, message: 'Authentication successful' });
        }
    })
    .catch(err => {
        console.error(err);
    })
  });