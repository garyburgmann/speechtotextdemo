import { Injectable } from '@angular/core';
import { AccountDetails } from './account-details'
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  Details: AccountDetails;
  $azureConfig = new Subject<AccountDetails>();  // use this to notify transaction list to update
  IsStorageValid: BehaviorSubject<boolean> = new BehaviorSubject(false);
  IsSpeechValid: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private authService: AuthService
  ) {
    // const detailsFromStorage = JSON.parse(this.authService.getAccountDetails()) as AccountDetails;
    // if (detailsFromStorage !== null) {
    //   this.Details = detailsFromStorage;
    //   this.validateDetails();
    // } else {
      
    // get details form auth service here!
    this.Details = new AccountDetails();
    this.authService.getAzureConfig()
      .subscribe(
        res => {
          this.Details.load(res);
          this.validateDetails();
          this.$azureConfig.next(this.Details);
        },
        err => console.log(err)
      )
    // }
  }

  save() {
    // localStorage.setItem('accountDetails', JSON.stringify(this.Details));
    this.validateDetails();
  }

  validateDetails() {
    if(!this.Details.RefreshRate){
      this.Details.RefreshRate = 30;
    }
    if (this.Details.Region && this.Details.ServiceKey) {
      this.IsSpeechValid.next(true);
    } else {
      this.IsSpeechValid.next(false);
    }
    if (this.Details.SASToken && this.Details.AccountName) {
      this.IsStorageValid.next(true);
    } else {
      this.IsStorageValid.next(false);
    }
  }
}
