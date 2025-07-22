import NextAuth from 'next-auth';

const fs = require('fs-extra');
var path = require('path');
import EmailProvider from 'next-auth/providers/email';

import { DatabaseAdapter } from '/lib/Database/Adapter/adapter';

export const authOptions = {
  // Configure one or more authentication providers
  adapter: DatabaseAdapter({
    type: 'mysql',
    host: process.env.NEXT_PUBLIC_MYSQL_HOST,
    port: process.env.NEXT_PUBLIC_MYSQL_PORT,
    username: process.env.NEXT_PUBLIC_MYSQL_USERNAME,
    password: process.env.NEXT_PUBLIC_MYSQL_PASSWORD,
    database: process.env.NEXT_PUBLIC_MYSQL_DATABASE_USERS,
    ssl: process.env.NEXT_PUBLIC_MYSQL_SSLENABLED == 'true' && {
      rejectUnauthorized: false,
      ca: `MIIDezCCAmOgAwIBAgIUY0EYAofjAhRfDkdw5Yi+vBprMEgwDQYJKoZIhvcNAQELBQAwTTELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQtSG9sbGFuZDESMBAGA1UEBwwJUm90dGVyZGFtMRMwEQYDVQQDDApmYWtlLURCLUNBMB4XDTIyMDUxMDEwNDI1NFoXDTMyMDMxODEwNDI1NFowTTELMAkGA1UEBhMCTkwxFTATBgNVBAgMDFp1aWQtSG9sbGFuZDESMBAGA1UEBwwJUm90dGVyZGFtMRMwEQYDVQQDDApmYWtlLURCLUNBMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2XGl8S5tm73g0QT9RBI6IQ0sfxlGJZEZItYdgcM9RR5l8f/83S8v9PuSQxisAY9zJYuK9woy0JZ1/+BDImqrBJGFDSTKXcE8WUfenVhETP3WmrIVajAC653D5+CDh9fddJKabobbkD4okpYJLPyulDOYekOab7oQLxlYbO5u2xWw2Mdmq/v4LeYeKeCpvVkjcvNAcIDcGJGFKcCdt8h9cc3G1WDGUPcV2hv5JrnELCzkp36pjxRzMtwBh5lD+HJVog+vF0fRqLgMotR4/xGtvbd3egLLZSIpUU11k/YLYx4ehnv1hl3zkJi5gfIpt1cTMJYjBg9T451G8j23hYowHwIDAQABo1MwUTAdBgNVHQ4EFgQUC8CjYDTvAUosvOBFAfyGI8G7qPQwHwYDVR0jBBgwFoAUC8CjYDTvAUosvOBFAfyGI8G7qPQwDwYDVR0TAQH/BAUwAwEB/zANBgkqhkiG9w0BAQsFAAOCAQEAPHBSs+fw5OVfS0Bh3CjXZit6/dyftiSOgP0m4FqlhbvXiB55gHJpaFpwOfgREFEP1YQ4x+abfmZwNiH9fiS0SaOnDvdmWSSH+mzElvDrWgNNzkZwraEcsF7ZcAONDKbzxtETfUDkGxj0JG95VfIsm+8VFtMNJgiWlyKiz12tWsyF6CZFdgSWhUfS4U2VeiGy9q7dOziG50YIoC3tPv2z8golia/kmyHAHKp5tgJZjvMx5vcYzxetBZPTy9If1ihaDW5moNUhtwZQ5kDVt3BqRrrSXP1GDUVa310q8n6fDqclxTVtuYuSEs/3fFTiHITruX+o6a4o7eD8Bzyy794GSA==`,
    },
  }),

  providers: [
    EmailProvider({
      service: 'Mailgun',
      server: {
        host: process.env.NEXT_PUBLIC_EMAIL_SERVER_HOST,
        port: process.env.NEXT_PUBLIC_EMAIL_SERVER_PORT,
        auth: {
          user: process.env.NEXT_PUBLIC_EMAIL_SERVER_USER,
          pass: process.env.NEXT_PUBLIC_EMAIL_SERVER_PASSWORD,
        },
      },
      from: 'DaimoonMedia <' + process.env.NEXT_PUBLIC_EMAIL_FROM + '>',
    }),
    // ...add more providers here
  ],
  callbacks: {
    async session({ session, user, token }) {
      session = {
        ...session,

        user: {
          ...session.user,
          id: user.id,
          image: JSON.parse(user.image),
          userRole: user.userRole,
          fname: user.name,
          lname: user.lname,
          birthday: user.birthday,
        },
      };

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
};

export default NextAuth(authOptions);
