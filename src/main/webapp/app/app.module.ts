import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BASE_URL } from './app.tokens';
import { TasksModule } from './tasks/tasks.module';
import { TaskServiceProvider } from 'app/task-service.provider';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    TasksModule,
    HttpClientModule
  ],
  providers: [
    {provide: BASE_URL, useValue: 'http://localhost:8080'},
    TaskServiceProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
