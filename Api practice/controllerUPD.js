import UserList from "./modelUPD.js";


class Controller{
    constructor(){
        this.userList=new UserList();
       

    }

   //get
    async getUser(e) {
      e.preventDefault();
      
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        
        this.userList.users = [];
        // Process and return the user data
        this.userList.getUser(data);
        
        console.log(this.userList.users.length + " users found");
        return this.userList.users;
      } catch (err) {
        console.error("Error:", err);

        return "Trouble in fetching data"; // Return an empty array or handle the error appropriately
      }
    }
    

    //delete
      async deleteUser(userId) {
        console.log(userId);
        const index = this.userList.getUserById(userId);
    
        if (index !== -1) {
          try{
            const response=await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
            });

            // if (!response.ok) {
            //   console.error("HTTP error:", response.status);
            //   return false;
            // }
            this.userList.deleteUser(userId);
            console.log("Item with id-" + userId + " deleted successfully.")
            
            return true;
          }catch (error) {
            console.error("Error posting data:", error);
            return false;
          }
    
        }
      }     


    //edit


     findUserToEdit(userId){
        const index=this.userList.getUserById(userId);

        if(index!==-1){

            const userToEdit=this.userList.users[index];
            
            return userToEdit;
        }
     }

     async editUser(userId,editedUser) {
        // Send a PUT request to update the user data
        try{
          const response= await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
                          method: "PATCH",
                          headers: {
                            "Content-Type": "application/json",
                          },
                          body: JSON.stringify(editedUser),
                        })
                        // if (!response.ok) {
                        //   console.error("HTTP error:", response.status);
                        //   return false;
                        // }

          this.userList.updateUser(userId, editedUser);
          console.log("Item with id-" + userId + " updated successfully.");
          return true;
        }      
         catch (error) {
              console.error("Error posting data:", error);
              return false;
            }
      }

    
    //post

    async postUser(newPost) {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });
    
        // if (!response.ok) {
        //   console.error("HTTP error:", response.status);
        //   return false;
        // }
    
        const data = await response.json();
        this.userList.postUser(
          newPost.id,
          newPost.name,
          newPost.username,
          newPost.email, 
          newPost.address.street, 
          newPost.address.suite, 
          newPost.address.city, 
          newPost.address.zipcode, 
          newPost.address.geo.lat, 
          newPost.address.geo.lng, 
          newPost.phone, 
          newPost.website, 
          newPost.company.name, 
          newPost.company.catchPhrase, 
          newPost.company.bs
         
        );
    
        console.log("Item with name " + data.name + " posted successfully");
        
        console.log(this.userList.users.length, " users found");
    
        return true;
      } catch (error) {
        console.error("Error posting data:", error);
        return false;
      }
    }
    

}

export default Controller;