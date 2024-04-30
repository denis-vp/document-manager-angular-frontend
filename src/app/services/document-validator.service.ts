import { Injectable } from '@angular/core';
import { MyDocument } from '../model/MyDocument.model';

@Injectable({
  providedIn: 'root',
})
export class DocumentValidatorService {
  constructor() {}

  validateDocument(document: MyDocument) {
    let errors = [];

    if (document.hasOwnProperty("author") === false) {
        errors.push("Document author is required");
    } else if (document["author"] === "") {
        errors.push("Document author is required");
    }
    
    if (document.hasOwnProperty("title") === false) {
        errors.push("Document title is required");
    } else if (document["title"] === "") {
        errors.push("Document title is required");
    }

    if (document.hasOwnProperty("numPages") === false) {
        errors.push("Document number of pages is required");
    } else if (typeof document["numPages"] !== "number") {
        errors.push("Document number of pages must be a number");
    } else if (document["numPages"] <= 0) {
        errors.push("Document number of pages must be greater than 0");
    }

    if (document.hasOwnProperty("type") === false) {
        errors.push("Document type is required");
    } else if (document["type"] === "") {
        errors.push("Document type is required");
    } else if (document["type"][0] !== ".") {
        errors.push("Document type must start with a period (.)");
    }

    if (document.hasOwnProperty("format") === false) {
        errors.push("Document format is required");
    } else if (document["format"] === "") {
        errors.push("Document format is required");
    }
    
    if (errors.length > 0) {
        throw new Error(errors.join(", "));
    }
};

}
