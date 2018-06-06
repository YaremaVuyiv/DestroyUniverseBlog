export class Comment {
    constructor(
        public text?: string,
        public time?: string,
        public id?: number,
        public userName?: string,
        public topicId?: number,
    ) { }
}