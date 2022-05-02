export class User {
    username: string;
    name: string;

    constructor (user: any) {
        this.username = user.username;
        this.name = user.name;
    }
}
