import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LikeService {

    private url = "/api/likes";

    headers: Headers;
    options: RequestOptions;

    constructor(private http: Http) {
        let authToken = localStorage.getItem('token');
        console.log(authToken);
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': `Bearer ${authToken}`,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }

    changeLike(topicId: number, isLiked: boolean) {
        const httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };

        return this.http.put(this.url + '/' + topicId, JSON.stringify(isLiked), this.options).toPromise().then(response => { return response; });
    }

    checkIfLiked(topicId: number) {
        return this.http.get(this.url + '/' + topicId, this.options).toPromise().then(response => { return response.json(); });
    }
}