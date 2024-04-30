import { Component } from '@angular/core';
import { DocumentListComponent } from '../document-list/document-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DocumentListComponent],
  styleUrl: './home.component.scss',
  template: `<app-document-list></app-document-list>`,
})
export class HomeComponent {

}
