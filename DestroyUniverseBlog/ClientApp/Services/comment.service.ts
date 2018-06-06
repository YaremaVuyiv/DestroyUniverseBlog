import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Comment } from '../Models/Comment';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CommentService {
    public token: string;

    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        let authToken = localStorage.getItem('token');
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': `Bearer ${authToken}`,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    private url = "/api/comment";

    getAllComments(topicId: number): Promise<any> {
        return this.http.get(this.url + '/' + topicId, this.options).toPromise().then(response => {
            return response.json();
        });
    }

    createComment(comment: Comment): Promise<any> {
        return this.http.post(this.url, JSON.stringify(comment), this.options).toPromise().then(response => { return response; });
    }

    deleteComponent(id: number) {
        return this.http.delete(this.url + '/' + id, this.options).toPromise().then(response => { return response; });
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}