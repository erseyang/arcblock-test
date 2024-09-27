// import middleware from "@blocklet/sdk/lib/middlewares";
import { Router, Request, Response } from 'express';
import { add, editUser, getUserById, getUsers } from "../controller/user-controller";
import logger from "../libs/logger";

const router = Router();

// router.use('/user', middleware.user(), (req, res) => res.json(req.user || {}));

router.use('/data', (_, res) =>
  res.json({
    message: 'Hello Blocklet!',
  }),
);

router.get('/profile', (_, res) => {
  res.json({
    message: 'Hello Blocklet!',
  });
});

router.get('/users', (req: Request, res: Response) => {
  return getUsers(req,res);
});

router.post('/user/edit', (req, res) => {
  return editUser(req, res);
});

// 添加用户，仅在测试的时候开放
router.post('/user/add', (req: Request, res: Response) => {
  return add(req,res);
});

// 根据用户的id来查询信息
router.get('/user/:id', (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).send({
      message: '数据不对',
    });
  }
  logger.info(userId);
  const userIdStr = parseInt(userId, 10);
  if (Number.isNaN(userIdStr)) {
    return res.status(400).send({
      message: '数据不对',
    });
  }
  return getUserById(userIdStr, res);
});




export default router;
