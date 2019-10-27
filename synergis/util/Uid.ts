export class Uid {

    static random16(): string { 
        return Uid.random4() + Uid.random4() + Uid.random4() + Uid.random4();
    }  

    static random4(): string {
        return Uid.random1() + Uid.random1() + Uid.random1() + Uid.random1();
    }

    static random1(): string {
        return Math.floor((Math.random() * 16)).toString(16);
    }

}