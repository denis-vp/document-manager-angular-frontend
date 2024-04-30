import { Component, Input } from '@angular/core';
import { MyDocument } from '../../model/MyDocument.model';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-document-details',
  standalone: true,
  imports: [],
  styleUrl: './document-details.component.scss',
  template: `
    <h2>Document Details</h2>
    <h3>Title: {{ document.title }}</h3>
    <p>Author: {{ document.author }}</p>
    <p>Description: {{ document.description }}</p>
    <p>Number of pages: {{ document.numPages }}</p>
    <p>Size: {{ document.size }}</p>
    <p>Type: {{ document.type }}</p>
    <p>Format: {{ document.format }}</p>
    <button (click)="onBack()">Back</button>
  `,
})
export class DocumentDetailsComponent {
  public document: MyDocument;

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const documentId = params.get('documentId') || '';
      this.apiService.getDocument(documentId).subscribe((document) => {
        console.log(document);
        this.document = document[0];
      });
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }
}
