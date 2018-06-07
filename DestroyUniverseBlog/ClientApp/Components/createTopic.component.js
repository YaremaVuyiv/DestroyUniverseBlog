var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Topic } from '../Models/Topic';
import { ActivatedRoute, Router } from "@angular/router";
var CreateTopicComponent = (function () {
    function CreateTopicComponent(dataService, route, router) {
        this.dataService = dataService;
        this.route = route;
        this.router = router;
        this.topic = new Topic();
        this.tableMode = true;
    }
    CreateTopicComponent.prototype.ngOnInit = function () {
    };
    CreateTopicComponent.prototype.createTopic = function () {
        var _this = this;
        console.log(JSON.stringify(this.topic));
        this.dataService.createTopic(this.topic).then(function (data) { _this.router.navigate(['/']); });
    };
    return CreateTopicComponent;
}());
CreateTopicComponent = __decorate([
    Component({
        templateUrl: '../Htmls/createTopic.component.html',
        providers: [DataService],
        styleUrls: ['../CSS/createTopic.component.css']
    }),
    __metadata("design:paramtypes", [DataService, ActivatedRoute, Router])
], CreateTopicComponent);
export { CreateTopicComponent };
//# sourceMappingURL=createTopic.component.js.map