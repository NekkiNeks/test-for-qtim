import * as crypto from 'node:crypto'

export class User {
    id: string;
    username: string;
    password: string;
    refreshToken: string | null;

    constructor(username: string, password: string) {
        this.id = crypto.randomUUID();
        this.username = username;

        const passwordBuffer = Buffer.from(password)
        this.password = crypto.createHash('sha256').update(passwordBuffer).digest('hex');

        this.refreshToken = null;
    }

    checkPassword(password: string) {
        const passwordBuffer = Buffer.from(password)

        console.log('test'); 
        
        return this.password === crypto.createHash('sha256').update(passwordBuffer).digest('hex');
    }
}
