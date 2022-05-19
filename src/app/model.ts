export class Post {
    pubId: number = 0;
    pub: string = "";
    date!: Date;
    user_id: number = 0;
    cat_id: number = 0;
    pubsubject: string = "";
}
export class Answer {
    AnsId: number = 0;
    Ans: string = "";
    date!: Date;
    user_id: number = 0;
    pubId: number = 0;
     
}
export class Cat {
    CatId: number = 0;
    CatName: string = "";
    CatFramework: string = "";
    CatLang: string = "";
    AdminId: number = 0;
    Image: string = "";

}
export class User {
    id: number = 0;
    last_login!:Date;
    username: string = "";
    email: string = "";
    date_joined !:Date;
}
export class Functions {
    functionId: number = 0;
    function: string = "";
}

export class admin {
    AdminId: number = 0;
    AdminName: string = "";
    AdminLastName: string = "";
    AdminPassword: string = "";
    functionId: number = 0;
}

export class Pub {
    pub: string = "";
    pubsubject: string = "";
}

