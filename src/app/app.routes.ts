import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DocumentDetailsComponent } from './components/document-details/document-details.component';
import { DocumentEditComponent } from './components/document-edit/document-edit.component';
import { DocumentAddComponent } from './components/document-add/document-add.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'document/details/:documentId', component: DocumentDetailsComponent },
  { path: 'document/edit/:documentId', component: DocumentEditComponent },
  { path: 'document/add', component: DocumentAddComponent },
];
