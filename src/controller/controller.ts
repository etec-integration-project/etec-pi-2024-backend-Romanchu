import { Response, Request } from 'express';
import { AppDataSource, udb } from '../persistance/db';
import { User } from '../persistance/user';

export const addUserToDB = async () => {
    udb.map(async (u: User) => {
        const newUser = new User();
        newUser.username = u.username;
        newUser.email = u.email;
        newUser.password = u.password;
        await AppDataSource.manager.save(newUser);
    });
};

export const loginUser = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await AppDataSource.manager.findOne(User, { where: { username, password } });
    if (user) {
        res.json({
            success: true,
            msg: "Iniciaste sesión con éxito",
        });
    } else {
        res.status(401).json({
            success: false,
            msg: "Fallo en el inicio de sesión",
        });
    }
};
