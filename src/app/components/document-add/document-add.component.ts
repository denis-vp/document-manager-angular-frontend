import { Component } from '@angular/core';
import { MyDocument } from '../../model/MyDocument.model';
import { ApiService } from '../../services/api.service';
import { DocumentValidatorService } from '../../services/document-validator.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-add',
  standalone: true,
  imports: [FormsModule],
  styleUrl: './document-add.component.scss',
  template: `
    <h1>Document Add</h1>
        <p id="document-id"><b>Document Id: </b> {{document.documentId}}</p>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" [(ngModel)]="document.title">
        </div>
        <div>
            <label for="author">Author</label>
            <input type="text" id="author" [(ngModel)]="document.author">
        </div>
        <div>
            <label for="description">Description</label>
            <textarea id="description" rows="3" [(ngModel)]="document.description"></textarea>
        </div>
        <div>
            <label for="num-pages">Number of pages</label>
            <input type="number" id="num-pages" [(ngModel)]="document.numPages">
        </div>
        <div>
            <label for="size">Size</label>
            <input type="text" id="size" [(ngModel)]="document.size">
        </div>
        <div>
            <label for="type">Type</label>
            <input type="text" id="type" [(ngModel)]="document.type">
        </div>
        <div>
            <label for="format">Format</label>
            <input type="text" id="format" [(ngModel)]="document.format">
        </div>
        <button id="update-button" (click)="onAdd()">Add</button>
        <button id="cancel-button" (click)="onCancel()">Cancel</button>
        <button id="back-button" (click)="onBack()">Back</button>
  `,
})
export class DocumentAddComponent {
  public document: MyDocument = {
    documentId: '',
    title: '',
    author: '',
    description: '',
    numPages: 0,
    size: 0,
    type: '',
    format: '',
  };

  constructor(
    private apiService: ApiService,
    private documentValidatorService: DocumentValidatorService,
    private router: Router
  ) {}


  onAdd() {
    try {
      this.documentValidatorService.validateDocument(this.document);
    } catch (error: any) {
      alert(error.message);
      return;
    }

    const confirmation = window.confirm("Are you sure you want to add this document?");
    if (confirmation) {
      this.apiService.addDocument(this.document).subscribe();
      this.router.navigate(['/']);
    }
  }

  onCancel() {
    const confirmation = window.confirm("Are you sure you want to cancel?");
    if (confirmation) {
      this.router.navigate(['/']);
    }
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
