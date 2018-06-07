import { Component, OnInit } from '@angular/core';
import { DataService } from '../Services/data.service';
import { Topic } from '../Models/Topic';

import { HttpResponse } from '@angular/common/http'
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    templateUrl: '../Htmls/createTopic.component.html',
    providers: [DataService],
    styleUrls: ['../CSS/createTopic.component.css']
})
export class CreateTopicComponent implements OnInit {

    topic: Topic = new Topic();  
    topics: Topic[];       
    tableMode: boolean = true; 
    name: string;
    body: string;

    constructor(private dataService: DataService, private route: ActivatedRoute, private router: Router) { }

    ngOnInit() {
        
    }

    createTopic() {
        console.log(JSON.stringify(this.topic));
        this.dataService.createTopic(this.topic).then(
            data => { this.router.navigate(['/']); }
        );
    }
}