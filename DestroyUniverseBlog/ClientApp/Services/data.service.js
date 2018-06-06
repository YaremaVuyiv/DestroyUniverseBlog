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
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var DataService = (function () {
    function DataService(http) {
        this.http = http;
        this.url = "/api/topics";
        var authToken = localStorage.getItem('token');
        console.log(authToken);
        this.headers = new Headers({
            'Content-Type': 'application/json',
            'Accept': 'q=0.8;application/json;q=0.9',
            'Authorization': "Bearer " + authToken,
        });
        this.options = new RequestOptions({ headers: this.headers });
    }
    DataService.prototype.getTopics = function () {
        return this.http.get(this.url).toPromise().then(function (response) { return response.json(); });
    };
    DataService.prototype.getTopicById = function (id) {
        return this.http.get(this.url + '/' + id).toPromise().then(function (response) { return response.json(); });
    };
    DataService.prototype.createTopic = function (topic) {
        return this.http.post(this.url, topic, this.options).toPromise().then(function (response) { return response; });
    };
    DataService.prototype.deleteTopic = function (id) {
        return this.http.delete(this.url + '/' + id, this.options).toPromise().then(function (response) { return response; });
    };
    return DataService;
}());
DataService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DataService);
export { DataService };
//# sourceMappingURL=data.service.js.map