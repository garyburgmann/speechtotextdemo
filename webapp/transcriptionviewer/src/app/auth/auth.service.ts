import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import * as CryptoJS from 'crypto-js';
// import * as jwt from 'jsonwebtoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private secretKey = 'super-secret';
  private user: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('auth_token');

    // key does not exist
    if (token === null) {
      return false;
    }

    this.user = this.validateToken(token);

    console.log('isAuthenticated: ', this.user);
    return this.user !== false;
  }

  public redirect() {
    this.http.get('http://localhost:8888/api/auth/sso')
      .toPromise()
      .then((res:  any) => {
        window.location.href=res.redirectUrl;
      })
      .catch(e => console.log(e));
  }

  public login(token: string) {
    const data = {'hello': 'world'};
    this.http.post('http://localhost:8888/api/auth/user', { token })
      .toPromise()
      .then((res:  any) => {
        this.user = res;
        const token = this.createToken(this.user);
        localStorage.setItem('auth_token', token);
        console.log('login: ', this.user);
        this.router.navigate(['/']);
      })
      .catch(e => console.log(e));   
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.user = null;
  }

  validateToken(token: string): any {
    try {
      // const decryptedToken = this.decrypt(token);
      return JSON.parse(token);  // jwt.verify(token, this.secretKey);
    } catch(err) {
      return false;
    }
  }

  createToken(user: any, expiresIn = 60 * 60): any {
    try {
      const token = JSON.stringify(user);  // jwt.sign(user, this.secretKey, { expiresIn });
      return token;  // this.encrypt(token);
    } catch(err) {
      return false;
    }
  }

  // encrypt(value: string): string {
  //   return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  // }

  // decrypt(textToDecrypt: string): string {
  //   return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  // }
}
