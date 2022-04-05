import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

import { AddUserComponent } from './add-user/add-user.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CoursesComponent } from './courses/courses.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditUserComponent } from './edit-user/edit-user.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { Interceptor } from './services/interceptor';
import { LoginComponent } from './login/login.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { VimeoService } from '../app/services/vimeo.service';
import { VimeoUrlPipe } from '../app/services/vimeo-url.pipe';
import { WarningComponent } from './warning/warning.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    EditUserComponent,
    AddUserComponent,
    DeleteUserComponent,
    CoursesComponent,
    WarningComponent,
    VimeoUrlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatToolbarModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSortModule,
    MatTooltipModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }, VimeoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
