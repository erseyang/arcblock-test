import { dbConnection } from "../libs/db";
import  User  from "../entity/user";
import {Request, Response} from "express";


export async function getUsers(_: Request, res: Response) {
  const userRepository = dbConnection.getRepository(User);
  const users = await userRepository.find();
  return res.send(users);
}

/**
 * 通过ID获取用户信息
 * @param userId
 * @param res
 */
export async function getUserById(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({
      message: '数据不对',
    });
  }
  const userId = parseInt(id, 10);
  if (Number.isNaN(userId)) {
    return res.status(400).send({
      message: '数据不对',
    });
  }
  const userRepository = dbConnection.getRepository(User);
  const user = await userRepository.findOneBy({id:userId})
  return res.send(user);
}

/**
 * 添加用户
 * @param req
 * @param res
 */
export async function add(req: Request, res: Response) {
  const userRepository = dbConnection.getRepository(User);
  const user = new User();
  user.phone = req.body.phone;
  user.email = req.body.email;
  user.name = req.body.name;
  await userRepository.save(user);
  res.status(200).send({'message': '添加成功'})
}

/**
 * 修改用户
 * @param req
 * @param res
 */
export async function editUser(req: Request, res: Response) {
  const userRepository = dbConnection.getRepository(User);
  const userId = req.body.id;
  const name = req.body.name;
  const updateUser = new User();
  if (name) {
    updateUser.name = name;
  }
  const phone = req.body.phone;
  if (phone) {
    updateUser.phone = phone;
  }
  const email = req.body.email;
  if (email) {
    updateUser.email = email;
  }
  await userRepository.update({id: userId}, updateUser)
  res.status(200).send({'message': '修改成功'})
}
