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
    const { mail, password, rememberMe } = req.body;
    client
    .query(`select * from users where mail = $1`, [mail])
    .then(dbres => {
        if (dbres.rowCount === 0 || dbres.rows[0]['password'] !== password) {
            res.status(200).json({ authenticated: false, message: 'Authentication failed' });
        }
        else {
            const user = dbres.rows[0];
            delete user.password;

            const token = jwt.sign(user, process.env.SECRET as Secret, { expiresIn: rememberMe ? "30d" : "10m" });
            res
            .status(200)
            .cookie("authtoken", token, {
                httpOnly: true,
                sameSite: false,
                secure: true,
                maxAge: rememberMe ? 1000*60*60*24*30 : 1000*60*10,
            })
            .json({ authenticated: true, role: user.role, message: 'Authentication successful' });
        }
    })
    .catch(err => {
        console.error(err);
    })
  });

  app.get('/api/products', (req, res) => {
    client
        .query("select * from products order by id;")
        .then(dbres => {
            res.status(200).json(dbres.rows);
        })
        .catch(err => {
            console.error(err);
        })
  });

  function insertDaysIntoDB(month: number) {
    let year = new Date().getFullYear();
    if (month < new Date().getMonth()) {
        year++;
    }
    const currentDate = new Date(year, month, 1);
    while (currentDate.getMonth() == month) {
        let date = currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate();
        console.log(date);
        client.query("insert into days values($1,$2,$3,$4,$5);", [date, 3, 3, false, '']);
        currentDate.setDate(currentDate.getDate() + 1);
    }
  };

  app.get('/api/days/:month', (req, res) => {

    // TODO!! authentication on this route //
    //                                     //
    /////////////////////////////////////////

    const month = req.params.month;
    const year = new Date().getFullYear();
    const firstDay = new Date(year, +month, 2);
    const lastDay = new Date(year, +month+1, 1);
    console.log(firstDay, lastDay);
    client
        .query("select day from days order by day desc limit 1;")
        .then(dbres => {
            const lastDBDay = new Date(dbres.rows[0].day);
            console.log(lastDBDay.getMonth(), month);
            if (lastDBDay.getMonth() === +month) {
                console.log("treba doplnit");
                insertDaysIntoDB(+month+1);
            };
        })
        .catch(err => {
            console.error(err);
        });

    client
        .query("select * from days where day >= $1 and day <= $2;", [firstDay, lastDay])
        .then(dbres => {
            res.status(200).json(dbres.rows);
        })
        .catch(err => {
            console.error(err);
        });
  }); 

  