import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LogInComponent } from './log-in/log-in.component';
import {NgIf} from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { UserDetailFormComponent } from './user-detail-form/user-detail-form.component';
import { ShowUserDetailsComponent } from './show-user-details/show-user-details.component';
import { UserDataService } from './user-data.service';
import {MatTableModule} from '@angular/material/table';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { HttpClientModule } from '@angular/common/http';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    UserDetailFormComponent,
    ShowUserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatIconModule,
    MatCardModule,
    NgIf,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerModule, 
    MatNativeDateModule,
    MatRadioModule,
    MatCheckboxModule,
    MatTableModule,
		NgxIntlTelInputModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule
    
  ],
  providers: [UserDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
