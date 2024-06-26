import { DataSource } from "typeorm"
import { Product } from "./product"
import { User } from "./user"
import "reflect-metadata"
import "dotenv/config"
import { describe } from "node:test"


describe("test", () => {
    it("Deberia crear un nuevo producto", async() => {
        const req = {
            img: "https://sublitextil.com.ar/wp-content/uploads/2022/08/pad-gamer-Sublimable-28x60cm.png",
            name: "Pad",
            price: 80,
            quantity: 1
        }
    const producto = require("../persistance/product")
    const res1 = await producto.create(req)
    expect(res1).toMatchObject(req)
    const res2 = await producto.findById(res1.id)
    expect(res2).toMatchObject(req)
    })
})

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging: true,
    entities: [Product, User],
    subscribers: [],
    migrations: []
})

export type Producto = {
    id: number
    img: string
    name: string
    price: number
    quantity: number
}

export type Usuario = {
    id: number
    username: string
    email: string
    password: string
    password2: string
}

export const db:Array <Producto> = [
    {
        id: 1,
        img: 'https://sublitextil.com.ar/wp-content/uploads/2022/08/pad-gamer-Sublimable-28x60cm.png',
        name: "Pad",
        price: 80,
        quantity: 1,
    }]

export const udb:Array <Usuario> = [
    {
        id: 1,
        username: "roma",
        email: "roma@gmail.com",
        password: "romanchu",
        password2: "romanchu"
    }
]