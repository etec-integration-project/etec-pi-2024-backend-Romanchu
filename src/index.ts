import express from 'express';
import { AppDataSource } from './persistance/db';
import { mainRouter } from './router/routes';
import { Product } from './persistance/product'
import { User } from './persistance/user';
import  cors from 'cors';
import {config} from 'dotenv';

config();
const database = process.env.DATABASE_NAME
console.log(database)
const username = process.env.DATABASE_USERNAME
console.log(username)
const password = process.env.DATABASE_PASSWORD
console.log(password)
const host = process.env.DATABASE_HOST
console.log(host)


const app = express();
const port = 8080;

app.use(function(_, res, next){
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origins, X-Requested-With, Content-Type, Accept");
    next();
})
    
app.use(express.json());
app.use ('/' , mainRouter);
app.use (cors());


AppDataSource.initialize()
    .then(async() => {
        console.log('Base de datos conectada');

//productos
        const validation_product = AppDataSource.manager.getRepository(Product)
        const product_exist = await validation_product.find()
        if (product_exist.length == 0){
            const product1 = new Product('https://sublitextil.com.ar/wp-content/uploads/2022/08/pad-gamer-Sublimable-28x60cm.png',"Pad1", 500, 1000);
            AppDataSource.manager.save([product1])
            console.log(product_exist)
        }

//usuario
        const validation_user = AppDataSource.manager.getRepository(User)
        const user_exist = await validation_user.find()
        if (user_exist.length == 0){
            const user1 = new User("Test" , "test@gmail.com", "1234", "1234")
            AppDataSource.manager.save([user1])
            console.log(user_exist)
        }
        app.listen(port, () => {
            console.log(`Servidor: http://localhost:${port}`);
        });
    })
    .catch(err => {
        throw err
    });

