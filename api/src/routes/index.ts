// import middleware from "@blocklet/sdk/lib/middlewares";
import { Router, Request, Response } from 'express';
import { editUser, getUserById, getUsers } from "../controller/user-controller";

const router = Router();

// router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);


router.get('/users', (req: Request, res: Response) => {
  return getUsers(req,res);
});

router.post('/user/edit', (req, res) => {
  return editUser(req, res);
});

// 添加用户，仅在测试的时候开放
// router.post('/user/add', (req: Request, res: Response) => {
//   return add(req,res);
// });

// 根据用户的id来查询信息
router.get('/user/:id', (req: Request, res: Response) => {
  return getUserById(req, res);
});

export default router;
