var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var LikeService = (function () {
    function LikeService(http) {
        this.http = http;
        this.url = "/api/likes";
        var authToken = localStorage.getItem('token');
        console.log(authToken);
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': "Bearer " + authToken,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }
    LikeService.prototype.changeLike = function (topicId, isLiked) {
        var httpOptions = {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        };
        return this.http.put(this.url + '/' + topicId, JSON.stringify(isLiked), this.options).toPromise().then(function (response) { return response; });
    };
    LikeService.prototype.checkIfLiked = function (topicId) {
        return this.http.get(this.url + '/' + topicId, this.options).toPromise().then(function (response) { return response.json(); });
    };
    return LikeService;
}());
LikeService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], LikeService);
export { LikeService };
//# sourceMappingURL=like.service.js.map