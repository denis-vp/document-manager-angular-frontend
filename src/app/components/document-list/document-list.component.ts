import { Component } from '@angular/core';
import { MyDocument } from '../../model/MyDocument.model';
import { ApiService } from '../../services/api.service';
import { MatListModule } from '@angular/material/list';
import { DocumentItemComponent } from '../document-item/document-item.component';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-document-list',
  standalone: true,
  imports: [MatListModule, DocumentItemComponent, CommonModule, FormsModule],
  styleUrl: './document-list.component.scss',
  template: `
    <h2>Document List</h2>
    <input
      type="text"
      placeholder="Search by type"
      (keydown.enter)="onSearchType()"
      [(ngModel)]="searchType"
    />
    <input
      type="text"
      placeholder="Search by format"
      (keydown.enter)="onSearchFormat()"
      [(ngModel)]="searchFormat"
    />
    <div id="previous-search">
      <b>Previous Search:</b> {{ previousPreviousSearch }}
    </div>
    <button id="add-button" (click)="onAdd()">Add</button>
    <div id="list">
      <div *ngFor="let document of documents" id="document-list">
        <app-document-item
          [document]="document"
          (details)="onDetails($event)"
          (edit)="onEdit($event)"
          (delete)="onDelete($event)"
        ></app-document-item>
      </div>
    </div>
  `,
})
export class DocumentListComponent {
  public documents: MyDocument[] = [];
  public previousSearch: string = '';
  public previousPreviousSearch: string = '';
  public searchType: string = '';
  public searchFormat: string = '';

  constructor(private apiService: ApiService, private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.populateList();
      });
  }

  ngOnInit() {
    this.populateList();
  }

  populateList() {
    const limit = 1000;
    this.apiService
      .getDocuments(limit, this.searchType, this.searchFormat)
      .subscribe(
        (documents) => (this.documents = documents),
        (error) => console.error(error)
      );
  }

  onDetails(documentId: string) {
    this.router.navigate(['/document/details', documentId]);
  }

  onEdit(documentId: string) {
    this.router.navigate(['/document/edit', documentId]);
  }

  onDelete(documentId: string) {
    const confirmation = confirm(
      'Are you sure you want to delete this document?'
    );
    if (confirmation) {
      this.apiService.deleteDocument(documentId).subscribe();
      this.documents = this.documents.filter(
        (document) => document.documentId !== documentId
      );
    }
  }

  onAdd() {
    this.router.navigate(['/document/add']);
  }

  onSearchType() {
    this.populateList();
    this.previousPreviousSearch = this.previousSearch;
    this.previousSearch = this.searchType;
  }

  onSearchFormat() {
    this.populateList();
    this.previousPreviousSearch = this.previousSearch;
    this.previousSearch = this.searchFormat;
  }
}
