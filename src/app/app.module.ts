import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, MatRadioModule, MatButtonModule, MatIconModule, MatMenuModule, MatBadgeModule } from '@angular/material';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { QuestionComponent } from './question/question.component';
import { ResultComponent } from './result/result.component';
import { QuestionsService } from './questions.service';
import { AnswersService } from './answers.service';
import { ExporterService } from './exporter.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

const dbConfig: DBConfig  = {
  name: 'MyDb',
  version: 1,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'name', keypath: 'name', options: { unique: false } },
      { name: 'email', keypath: 'email', options: { unique: false } },
      { name: 'telefone', keypath: 'telefone', options: { unique: false } },
      { name: 'completed', keypath: 'completed', options: { unique: false } }
    ]
  }, {
    store: 'answer',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
      { name: 'userId', keypath: 'userId', options: { unique: false } },
      { name: 'questionIdx', keypath: 'questionIdx', options: { unique: false } },
      { name: 'exatas', keypath: 'exatas', options: { unique: false } },
      { name: 'biologicas', keypath: 'biologicas', options: { unique: false } },
      { name: 'engenhariatecnologia', keypath: 'engenhariatecnologia', options: { unique: false } },
      { name: 'saude', keypath: 'saude', options: { unique: false } },
      { name: 'agrarias', keypath: 'agrarias', options: { unique: false } },
      { name: 'sociais', keypath: 'sociais', options: { unique: false } },
      { name: 'humanas', keypath: 'humanas', options: { unique: false } },
      { name: 'linguistica', keypath: 'linguistica', options: { unique: false } },
      { name: 'letras', keypath: 'letras', options: { unique: false } },
      { name: 'artes', keypath: 'artes', options: { unique: false } },
    ]
  }]
};

@NgModule({
  declarations: [
    AppComponent,
    UserInfoComponent,
    QuestionComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatRadioModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatBadgeModule,
    HttpClientModule,
    ChartsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    QuestionsService,
    AnswersService,
    ExporterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
