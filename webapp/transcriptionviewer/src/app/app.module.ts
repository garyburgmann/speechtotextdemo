import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatSnackBarModule, MatDialogModule, MatIcon, MatIconModule, MatTooltip, MatTooltipModule, MatDividerModule, MatCardModule, MatListModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranscriptionModule } from './transcription/transcription.module';
import { NavigationComponent } from './navigation/navigation.component';
import { SortByPipe } from './sort-by.pipe';
import { HelpComponent } from './help/help.component';
import { LoginComponent } from './auth/login/login.component';
//import { UploadAudioComponent } from './transcription/containers/upload-audio/upload-audio.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    SortByPipe,
    HelpComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatDialogModule,
    FlexLayoutModule,
    MatIconModule,
    MatTooltipModule,
    MatDividerModule,
    MatCardModule,
    MatListModule
  ],
entryComponents:[],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
