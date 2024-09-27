import { DataSource } from "typeorm";
import UserEntity from "../entity/user";

// const options: ConnectionOptions = {
//   type: 'sqlite',
//   database: './db/db.sqlite',
//   entities: [UserEntity],
// };

export const dbConnection = new DataSource({
  type: 'sqlite',
  database: './db/db.sqlite',
  synchronize: true,
  logging: ['error', 'warn'],
  entities: [UserEntity],
  entityPrefix: 't_',
});
