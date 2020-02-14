import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
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

  public getAzureConfig(): Observable<any> {
    let headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    });
    return this.http.get('http://localhost:8888/api/azure/config', { headers })
  }
  public redirect() {
    this.http.get('http://localhost:8888/api/auth/sso')
      .subscribe(
        (res: any) => {
          window.location.href=res.redirect_url;
        },
        err => console.log(err)
      );
  }

  public login(token: string) {
    const data = {'hello': 'world'};
    this.http.post('http://localhost:8888/api/auth/user', { token })
      .subscribe(
        (res: any) => {
          const user = res.s_number;
          const token = res.token;
          localStorage.setItem('auth_token', token);
          localStorage.setItem('user', user);
          this.$user.next(user);
          this.router.navigate(['/']);
        },
        err => console.log(err)
      )  
  }

  public logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('accountDetails');
    this.$user.next(null);
  }

  public getAccountDetails() {
    return localStorage.getItem('accountDetails');
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
