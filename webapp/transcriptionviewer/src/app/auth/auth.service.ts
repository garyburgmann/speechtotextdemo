import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
// import * as CryptoJS from 'crypto-js';
// import * as jwt from 'jsonwebtoken';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private secretKey = 'super-secret';
  public $user = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = this.getToken();
    const user = localStorage.getItem('user');
    console.log('isAuthenticated: ', user, token);
    this.$user.next(user);
    return (token !== null && user !== null);
  }

  public getToken(): string {
    return localStorage.getItem('auth_token');
  }

  public getAzureConfig(): any {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    this.http.get('http://localhost:8888/api/azure/config', { headers })
      .toPromise()
      .then((res:  any) => {
        window.location.href=res.redirect_url;
      })
      .catch(e => console.log(e));
  }
  public redirect() {
    this.http.get('http://localhost:8888/api/auth/sso')
      .toPromise()
      .then((res:  any) => {
        window.location.href=res.redirect_url;
      })
      .catch(e => console.log(e));
  }

  public login(token: string) {
    const data = {'hello': 'world'};
    this.http.post('http://localhost:8888/api/auth/user', { token })
      .toPromise()
      .then((res:  any) => {
        const user = res.s_number;
        const token = res.token;
        localStorage.setItem('auth_token', token);
        localStorage.setItem('user', user);
        console.log('login: ', user);
        this.$user.next(user);
        this.router.navigate(['/']);
      })
      .catch(e => console.log(e));   
  }

  public logout() {
    localStorage.removeItem('auth_token');
    this.$user.next(null);
  }
  
}
  // validateToken(token: string): any {
  //   try {
  //     // const decryptedToken = this.decrypt(token);
  //     return JSON.parse(token);  // jwt.verify(token, this.secretKey);
  //   } catch(err) {
  //     return null;
  //   }
  // }

  // createToken(user: any, expiresIn = 60 * 60): any {
  //   try {
  //     const token = JSON.stringify(user);  // jwt.sign(user, this.secretKey, { expiresIn });
  //     return token;  // this.encrypt(token);
  //   } catch(err) {
  //     return false;
  //   }
  // }

  // encrypt(value: string): string {
  //   return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  // }

  // decrypt(textToDecrypt: string): string {
  //   return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  // }
