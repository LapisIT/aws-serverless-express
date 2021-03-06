import * as express from 'express';
import {NextFunction} from 'express';
import { asyncMiddleware } from './asyncMiddleware';
import {createLog} from './logs/logging';
import {isNil, prop, path} from './ramda-functions';

import * as unless from 'express-unless';
import { JwtRequest } from './types';

const log = createLog(__filename);

const namespace = 'https://your-api-name-space-in-auth0/';

const getRole = (user: any): string => {
  const roles = prop(`${namespace}roles`, user);
  log.debug('findUser user: %s, %j, roles: %j, %s, roles.length: %s, email: %s',
    user, user, roles, typeof roles, roles.length);
  return isNil(prop('0', roles)) ? 'User' : prop('0', roles);
};

const getUserEmail = (req: express.Request): string => {
  return path(['user', 'email'], req) as string;
};

const findUser: any = asyncMiddleware(async (req: JwtRequest, res: express.Response, next: NextFunction) => {
  const user = prop('user', req);

  if(isNil(user)) {
    return next({err: 'user not found'});
  }

  const email = user.email = prop(`${namespace}email`, user);

  user.role = getRole(user);

  log.debug('findUser user: %s, %j, email: %s',
    user, user, email);
  next();
});

findUser.unless = unless;

export {
  findUser,
  getUserEmail,
};
