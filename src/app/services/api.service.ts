import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MyDocument } from '../model/MyDocument.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDocuments(limit = 100, type = '', format = '') {
    let params = `?limit=${limit}`;
    if (type !== '') params += `&type=${type}`;
    if (format !== '') params += `&format=${format}`;

    const url = this.apiUrl + '/document/list' + params;

    return this.http.get<MyDocument[]>(url);
  }

  getDocument(id: string) {
    const url = this.apiUrl + '/document/get?documentId=' + id;

    return this.http.get<MyDocument[]>(url);
  }

  addDocument(document: MyDocument) {
    const url = this.apiUrl + '/document/add';

    return this.http.post(url, { document: document });
  }

  updateDocument(documentId: string, newDocument: MyDocument) {
    const url = this.apiUrl + '/document/update?documentId=' + documentId;

    return this.http.patch(url, { document: newDocument });
  }

  deleteDocument(documentId: string) {
    const url = this.apiUrl + '/document/delete?documentId=' + documentId;

    return this.http.delete(url);
  }
}
