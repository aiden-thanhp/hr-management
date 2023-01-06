import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient) { }

  getPresignedUrl(fileName: any, fileType: any): any {
    const getheaders = new HttpHeaders().set('Accept', 'application/json');
    const params = new HttpParams().set('fileName', fileName).set('fileType', fileType);
    return this.http.get<any>('http://localhost:3000/s3Url', { params: params, headers: getheaders });
  }

  uploadfileAWSS3(url: any, contentType: any, file: any): Observable<any> { 
    return this.http.put(url, file, {
      headers: {
        "Content-Type": contentType
      }
    });
  }
}
