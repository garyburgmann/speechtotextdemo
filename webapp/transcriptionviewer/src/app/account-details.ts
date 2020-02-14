import { Observable, BehaviorSubject } from 'rxjs';

export class AccountDetails {
  AccountName: string;
  SASToken: string;
  Region: string;
  ServiceKey: string;
  RefreshRate:number = 30;

  load(res: any) {
    this.AccountName = res.azure.storage_account.name;
    this.SASToken = res.azure.storage_account.sas_token;
    this.Region = res.azure.speech_service.region;
    this.ServiceKey = res.azure.speech_service.key;
    this.RefreshRate = res.azure.speech_service.refresh;
  }
}
