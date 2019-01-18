export class User {
    constructor(
        public id: number,
        public username: string,
        public password: string,
        public email: string,
        public gravatar: string,
    ) { }
}

/*
unnecessary
for example, we receive:
{"id":3,"username":"1","password":"","successful":true,"error":"","cookie":true,
"cookies":[{"name":"sessionid","value":"1Fl84Vb5kUt2Al1kEQIiyfOcvwJ"}]}
from back-end, we subscribe the 'result', thus the 'result' is the json object's name,
we can use result.username or result.cookies[0].value to access
any member of this json object.
export class Cookie_ {
    constructor(
        public name: string,
        public value: string,
    ) {}
}

export class Result_ {
    constructor(
        //public user: User_,
        public id: number,
        public username: string,
        public password: string,

        public successful: boolean,
        public error: string,
        public cookie: boolean,
        public cookies: Cookie_[],
    ) {}
}
*/
