import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MyDocument } from '../../model/MyDocument.model';

@Component({
  selector: 'app-document-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatDividerModule],
  styleUrl: './document-item.component.scss',
  template: `
    <mat-card>
      <mat-card-header>
        <mat-card-title>{{ document.title }}</mat-card-title>
        <mat-card-subtitle>{{ document.author }}</mat-card-subtitle>
      </mat-card-header>
      <mat-card-content>
        <p>{{ document.description }}</p>
        <mat-divider></mat-divider>
        <p>Number of pages: {{ document.numPages }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button (click)="onDetails()">DETAILS</button>
        <button mat-icon-button (click)="onEdit()">
          <mat-icon fontIcon="edit"></mat-icon>
        </button>
        <button mat-icon-button (click)="onDelete()">
          <mat-icon fontIcon="delete"></mat-icon>
        </button>
      </mat-card-actions>
    </mat-card>
  `,
})
export class DocumentItemComponent {
  @Input() document: MyDocument;
  @Output() details = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor() {}

  onDetails() {
    this.details.emit(this.document.documentId);
  }

  onEdit() {
    this.edit.emit(this.document.documentId);
  }

  onDelete() {
    this.delete.emit(this.document.documentId);
  }
}
