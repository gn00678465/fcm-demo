import { Injectable } from '@nestjs/common';
import { JWT, type Credentials } from 'google-auth-library';
import * as serviceAccount from '../../serviceAccount.json';

@Injectable()
export class TokenService {
  getAccessToken(): Promise<Credentials> {
    return new Promise(function (resolve, reject) {
      const key = serviceAccount;
      const jwtClient = new JWT(
        key.client_email,
        undefined,
        key.private_key,
        ['https://www.googleapis.com/auth/firebase.messaging'],
        undefined,
      );
      jwtClient.authorize(function (err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        resolve(tokens);
      });
    });
  }
}
