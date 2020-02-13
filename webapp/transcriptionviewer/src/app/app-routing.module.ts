import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { HelpComponent } from './help/help.component';
// import { TrancriptListComponent } from './trancript-list/trancript-list.component';
// import { TranscriptionDetailComponent } from './transcription-detail/transcription-detail.component';
// import {UploadAudioComponent} from './upload-audio/upload-audio.component';
// import { TranscriptionNewComponent } from './transcription-new/transcription-new.component';
import { AuthGuardService as AuthGuard } from './auth/auth-guard.service';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
{ path: 'auth/login', pathMatch: 'full', component: LoginComponent},
{ path: 'auth/callback', pathMatch: 'full', component: LoginComponent},
{ path: '', pathMatch: 'full', redirectTo: 'transcription' },
{
  path: 'transcription',
  canActivate: [AuthGuard] ,
  loadChildren: () => import('./transcription/transcription.module').then(m => m.TranscriptionModule)
},
 {path: 'help',component: HelpComponent},
// {path: 'transcripts/:transcriptId', component:TranscriptionDetailComponent},
// {path:'newtranscripts',component:TranscriptionNewComponent},
// {path: 'upload', component:UploadAudioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
