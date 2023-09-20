import UserServices from "../services/user.services";

export default class UserController{

    public constructor(
        private readonly userServices: UserServices
    ){}

    public async getAllUsers(req: any, res: any) {
        try{
            const users = await this.userServices.getAllUsers()
            res.status(200).send(users)
        }catch(error){
            console.error(error)
            res.status(500).send({ message: "Internal server error, please try again later", error })
        }
    }
}