import * as crypto from 'node:crypto';

export class News {
    id: string;
    title: string;
    text: string;

    constructor(title: string, text: string) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.text = text;
    }
}
