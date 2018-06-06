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
import { Comment } from '../Models/Comment';
import { ActivatedRoute, Router } from "@angular/router";
import { LikeService } from "../Services/like.service";
import { AuthenticationService } from "../Services/authentication.service";
import { CommentService } from "../Services/comment.service";
var TopicDetailComponent = (function () {
    function TopicDetailComponent(dataService, likeService, authService, commentService, route, router) {
        this.dataService = dataService;
        this.likeService = likeService;
        this.authService = authService;
        this.commentService = commentService;
        this.route = route;
        this.router = router;
        this.topic = new Topic();
        this.isLiked = false;
        this.likeButtonShown = false;
        this.upOrDown = "up";
        this.comment = new Comment("");
        this.isDataLoaded = false;
        this.canAccessAdminFields = false;
    }
    TopicDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.likeService.checkIfLiked(id).then(function (data) {
            _this.isLiked = data;
            _this.upOrDown = _this.isLiked ? 'down' : 'up';
        });
        this.authService.canAccessAdminFields().then(function (response) {
            _this.canAccessAdminFields = response;
        });
        this.likeButtonShown = localStorage.getItem('token') != null;
        this.getAllComments();
        this.loadTopicById(id);
    };
    TopicDetailComponent.prototype.ngAfterViewInit = function () {
        this.isDataLoaded = true;
    };
    TopicDetailComponent.prototype.getAllComments = function () {
        var _this = this;
        var id = +this.route.snapshot.paramMap.get('id');
        this.commentService.getAllComments(id).then(function (response) {
            _this.comments = response;
        });
    };
    TopicDetailComponent.prototype.createComment = function () {
        var _this = this;
        console.log(this.commentText);
        this.comment.topicId = +this.route.snapshot.paramMap.get('id');
        this.comment.text = this.commentText;
        this.commentService.createComment(this.comment).then(function (response) {
            _this.getAllComments();
        });
        this.comment = new Comment();
    };
    TopicDetailComponent.prototype.loadTopicById = function (id) {
        var _this = this;
        this.dataService.getTopicById(id)
            .then(function (data) {
            _this.topic = data;
        });
    };
    TopicDetailComponent.prototype.deleteTopic = function () {
        var _this = this;
        this.dataService.deleteTopic(this.topic.id).then(function (data) { _this.router.navigate(['/']); });
    };
    TopicDetailComponent.prototype.likeClick = function () {
        var _this = this;
        this.likeService.changeLike(this.topic.id, !this.isLiked).then(function (data) {
            _this.loadTopicById(_this.topic.id);
            _this.isLiked = !_this.isLiked;
            _this.upOrDown = _this.isLiked ? 'down' : 'up';
        });
    };
    TopicDetailComponent.prototype.deleteComment = function (id) {
        var _this = this;
        this.commentService.deleteComponent(id).then(function (response) {
            _this.getAllComments();
        });
    };
    return TopicDetailComponent;
}());
TopicDetailComponent = __decorate([
    Component({
        templateUrl: '../Htmls/topicDetail.component.html',
        providers: [DataService, LikeService, AuthenticationService, CommentService],
        styles: ['../CSS/topicDetail.component.css'],
    }),
    __metadata("design:paramtypes", [DataService, LikeService,
        AuthenticationService, CommentService,
        ActivatedRoute, Router])
], TopicDetailComponent);
export { TopicDetailComponent };
//# sourceMappingURL=topicDetail.component.js.map