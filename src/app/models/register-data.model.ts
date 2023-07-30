export class RegisterData {
    username: String;
    password: String;
    email: String;
    name: String;

    constructor(username?: String, password?: String, email?: String, name?: String) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.name = name;
    }
}
