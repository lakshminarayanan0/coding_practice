class User {
    constructor(id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, catchPhrase, bs) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.address = {
            street: street,
            suite: suite,
            city: city,
            zipcode: zipcode,
            geo: {
                lat: lat,
                lng: lng
            }
        };
        this.phone = phone;
        this.website = website;
        this.company = {
            name: companyName,
            catchPhrase: catchPhrase,
            bs: bs
        };
    }
}

class UserList{
    constructor(){
     this.users=[];
    }

    getUser(userList){
        userList.forEach(user => {
        const userObj=new User(
            user.id,
            user.name,
            user.username,
            user.email, 
            user.address.street, 
            user.address.suite, 
            user.address.city, 
            user.address.zipcode, 
            user.address.geo.lat, 
            user.address.geo.lng, 
            user.phone, 
            user.website, 
            user.company.name, 
            user.company.catchPhrase, 
            user.company.bs)
            // console.log(userObj);
        this.users.push(userObj)            
        });
    }

    postUser(id,name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, catchPhrase, bs){
      const newUser=new User(id, name, username, email, street, suite, city, zipcode, lat, lng, phone, website, companyName, catchPhrase, bs);
      this.users.push(newUser);
      console.log(newUser);
    //   console.log(this.users);
    }

    deleteUser(userId) {
        const userIndex = this.getUserById(userId);
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1);
        }
    }
    updateUser(userId,editedUser){
       const userIndex=this.getUserById(userId)
       if(userIndex!==-1){
       this.users[userIndex]=editedUser;
       console.log(editedUser);
       }
    }

    getUserById(userId){
        return this.users.findIndex(user=>user.id===parseInt(userId));
    }
    
}

export default UserList;


