import { Category } from "./category";
import { Note } from "./note";

export class User {
    name: String;
    username: String;
    email: String;
    notes: Note[];
    categories: Category[];

    constructor() {

    }
}
