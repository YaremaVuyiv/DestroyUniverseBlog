import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Topic } from '../Models/Topic';
import { Comment } from '../Models/Comment';

import { HttpResponse } from '@angular/common/http'
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../Models/User";
import { LikeService } from "../Services/like.service";
import { AuthenticationService } from "../Services/authentication.service";
import { CommentService } from "../Services/comment.service";

@Component({
    templateUrl: '../Htmls/topicDetail.component.html',
    providers: [DataService, LikeService, AuthenticationService, CommentService],
    styleUrls: ['../CSS/topicDetail.component.css'],
})
export class TopicDetailComponent implements OnInit, AfterViewInit {

    topic: Topic = new Topic();
    topics: Topic[];
    isLiked: boolean = false;
    likeButtonShown: boolean = false;
    upOrDown = "up";
    comments: Comment[];
    comment: Comment = new Comment("");
    isDataLoaded = false;
    commentText: string;
    canAccessAdminFields: boolean = false;

    constructor(private dataService: DataService, private likeService: LikeService,
        private authService: AuthenticationService, private commentService: CommentService,
        private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        let id = +this.route.snapshot.paramMap.get('id');

        this.likeService.checkIfLiked(id).then(
            (data: boolean) => {
                this.isLiked = data;
                this.upOrDown = this.isLiked ? 'down' : 'up';
            }
        );

        this.authService.canAccessAdminFields().then((response: boolean) => {
            this.canAccessAdminFields = response;
        });
        this.likeButtonShown = localStorage.getItem('token') != null;

        this.getAllComments();
        this.loadTopicById(id);
    }

    ngAfterViewInit() {
        this.isDataLoaded = true;
    }

    getAllComments() {
        let id = +this.route.snapshot.paramMap.get('id');
        this.commentService.getAllComments(id).then((response: Comment[]) => {
            this.comments = response;
        });
    }

    createComment() {
        this.comment.topicId = +this.route.snapshot.paramMap.get('id');
        this.comment.text = this.commentText;
        this.commentService.createComment(this.comment).then(response => {
            this.getAllComments();
        });
        this.comment = new Comment();
    }

    loadTopicById(id: number) {
        this.dataService.getTopicById(id)
            .then((data: Topic) => {
                this.topic = data;
            });
    }

    deleteTopic() {
        this.dataService.deleteTopic(this.topic.id).then(
            data => { this.router.navigate(['/']); }
        );
    }

    likeClick() {
        this.likeService.changeLike(this.topic.id, !this.isLiked).then(
            data => {
                this.loadTopicById(this.topic.id);
                this.isLiked = !this.isLiked;
                this.upOrDown = this.isLiked ? 'down' : 'up';
            });
    }

    deleteComment(id: number) {
        this.commentService.deleteComponent(id).then(response => {
            this.getAllComments();
        });
    }
}