/** @return { import("next-auth/adapters").Adapter } */
import { DataSource } from "typeorm"
import * as path from 'path';
import { AccountEntity } from './entities/accounts';
import { SessionEntity } from './entities/sessions';
import { UserEntity } from './entities/users';
import { VerificationTokenEntity } from './entities/verification_tokens';
import { BusinessEntity } from './entities/businesses';
import { PackageEntity } from './entities/packages';
import { ResellerEntity } from './entities/resellers';

import { addToList, createAndUpdateProfile } from '../../Klaviyo';


/** Global Datasource  */
let _dataSource;

async function getManager() {
  if (!_dataSource) _dataSource = await new DataSource({
    type: "mysql",
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: Number(process.env.NEXT_PUBLIC_MYSQL_PORT),
    username: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE,
    ssl: process.env.NEXT_PUBLIC_MYSQL_SSLENABLED == 'true' && {
      rejectUnauthorized: false,
      ca: `MIIDezCCAmOgAwIBAgIUY0EYAofjAhRfDkdw5Yi+vBprMEgwDQYJKoZIhvcNAQELBQAwTTELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQtSG9sbGFuZDESMBAGA1UEBwwJUm90dGVyZGFtMRMwEQYDVQQDDApmYWtlLURCLUNBMB4XDTIyMDUxMDEwNDI1NFoXDTMyMDMxODEwNDI1NFowTTELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQtSG9sbGFuZDESMBAGA1UEBwwJUm90dGVyZGFtMRMwEQYDVQQDDApmYWtlLURCLUNBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2XGl8S5tm73g0QT9RBI6IQ0sfxlGJZEZItYdgcM9RR5l8f/83S8v9PuSQxisAY9zJYuK9woy0JZ1/+BDImqrBJGFDSTKXcE8WUfenVhETP3WmrIVajAC653D5+CDh9fddJKabobbkD4okpYJLPyulDOYekOab7oQLxlYbO5u2xWw2Mdmq/v4LeYeKeCpvVkjcvNAcIDcGJGFKcCdt8h9cc3G1WDGUPcV2hv5JrnELCzkp36pjxRzMtwBh5lD+HJVog+vF0fRqLgMotR4/xGtvbd3egLLZSIpUU11k/YLYx4ehnv1hl3zkJi5gfIpt1cTMJYjBg9T451G8j23hYowHwIDAQABo1MwUTAdBgNVHQ4EFgQUC8CjYDTvAUosvOBFAfyGI8G7qPQwHwYDVR0jBBgwFoAUC8CjYDTvAUosvOBFAfyGI8G7qPQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAPHBSs+fw5OVfS0Bh3CjXZit6/dyftiSOgP0m4FqlhbvXiB55gHJpaFpwOfgREFEP1YQ4x+abfmZwNiH9fiS0SaOnDvdmWSSH+mzElvDrWgNNzkZwraEcsF7ZcAONDKbzxtETfUDkGxj0JG95VfIsm+8VFtMNJgiWlyKiz12tWsyF6CZFdgSWhUfS4U2VeiGy9q7dOziG50YIoC3tPv2z8golia/kmyHAHKp5tgJZjvMx5vcYzxetBZPTy9If1ihaDW5moNUhtwZQ5kDVt3BqRrrSXP1GDUVa310q8n6fDqclxTVtuYuSEs/3fFTiHITruX+o6a4o7eD8Bzyy794GSA==`,
    },
    synchronize: process.env.NEXT_PUBLIC_ENV != 'development' ? false : true,
    logging: false,
    entities: [AccountEntity, BusinessEntity, SessionEntity, UserEntity, VerificationTokenEntity, PackageEntity, ResellerEntity],
    subscribers: [],
    migrations: [],
  });

  const manager =
    _dataSource === null || _dataSource === void 0
      ? void 0
      : _dataSource.manager;
  if (!manager.connection.isInitialized) {
    await manager.connection.initialize();
  }
  
  return manager;
}

export function DatabaseAdapter(client, options = {}) {
  return {
    async createUser(data) {
      const {email} = data;
      const m = await getManager();
      const user = await m.save(UserEntity, data);

      createAndUpdateProfile({
        email: email,
      })
        .then((response) => {
          addToList(response.data.id, 'Y9e2JA');
        })

      return user
    },
    async getUser(id) {
      const m = await getManager();
      const user = await m.findOne(UserEntity, { where: { id } });

      if (!user) return null;
      return { ...user };
    },
    async getUserByEmail(email) {
      const m = await getManager();
      const user = await m.findOne(UserEntity, { where: { email } });

      if (!user) return null;

      return { ...user };
    },
    async getUserByAccount({ providerAccountId, provider }) {
      var _a;
      const m = await getManager();
      const account = await m.findOne(AccountEntity, {
        where: providerAccountId,
        relations: ['user'],
      });

      if (!account) return null;
      return (_a = account.user) !== null && _a !== void 0 ? _a : null;
    },
    async updateUser(data) {
      const m = await getManager();
      const user = await m.save(UserEntity, data);

      return user;
    },
    async deleteUser(userId) {
      return
    },
    async linkAccount(account) {
      return
    },
    async unlinkAccount({ providerAccountId, provider }) {
      return
    },
    async createSession(data) {
      const m = await getManager();
      const session = await m.save(SessionEntity, data);
      return session;
    },
    async getSessionAndUser(sessionToken) {
      const m = await getManager();
      const sessionAndUser = await m.findOne(SessionEntity, {
        where: { sessionToken },
        relations: ['user'],
      });
      if (!sessionAndUser) return null;
      const { user, ...session } = sessionAndUser;
      return { session, user };
    },
    async updateSession(data) {
      const m = await getManager();
      await m.update(
        'SessionEntity',
        { sessionToken: data.sessionToken },
        data
      );
      // TODO: Try to return?
      return null;
    },
    async deleteSession(sessionToken) {
      return
    },
    async createVerificationToken(data) {
      const m = await getManager();
      const verificationToken = await m.save(VerificationTokenEntity, data);
     
      delete verificationToken.id;
      return verificationToken;
    },
    async useVerificationToken(identifier_token) {
      const m = await getManager();
      const verificationToken = await m.findOne(VerificationTokenEntity, {
        where: identifier_token,
      });
      if (!verificationToken) {
        return null;
      }
      await m.delete(VerificationTokenEntity, identifier_token);
      
      delete verificationToken.id;
      return verificationToken;
    },
    async createReseller(data) {
      const m = await getManager();
      const reseller = await m.save(ResellerEntity, data);

      return reseller;
    },
    async getResellerByUserId(userId) {
      const m = await getManager();
      const resellerEntity = await m.findOne(ResellerEntity, {
        where: { userId },
      });

      const packageEntity = await m.find(PackageEntity, {
        where: { resellerId: resellerEntity.id },
      });

      const reseller = {
        reseller: resellerEntity,
        packages: packageEntity,
      };

      if (!reseller) return null;
      return { ...reseller };
    },
    async getResellerPackageById(resellerId) {
      const m = await getManager();
      const resellerpackage = await m.find(PackageEntity, {
        where: { resellerId },
      });

      if (!resellerpackage) return null;
      return resellerpackage
    },

     async createPackage(data) {
      const m = await getManager();
      const resellerpackage = await m.save(PackageEntity, data);

      return resellerpackage;
    },

    async deletePackage(id){
       const m = await getManager();
       await m.delete(PackageEntity, id);
    }
  }
}