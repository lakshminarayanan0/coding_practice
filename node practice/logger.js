// import Emitter from 'events';
//  export class Person extends Emitter{
//     totalCount=0;
    
//     greet(name,age){
//     this.emit("person",{id:++this.totalCount,name,age})
//     }
// }
 
const EventEmitter = require('events');

class Person extends EventEmitter {
    constructor() {
        super();
        this.totalCount = 0;
    }

    greet(name, age) {
        this.emit("person", { id: ++this.totalCount, name, age });
    }
}

module.exports = { Person };
