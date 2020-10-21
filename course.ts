export class Course {
    name: string;
    credits: number;
    professor: string;

    constructor(name : string, credits : number, professor : string) {
        this.name = name;
        this.credits = credits;
        this.professor = professor;
    }
}