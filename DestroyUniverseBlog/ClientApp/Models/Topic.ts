export class Topic {
    constructor(
        public name?: string,
        public body?: string,
        public id?: number,
        public creatorId?: number,
        public rating?: number
    ) { }
}