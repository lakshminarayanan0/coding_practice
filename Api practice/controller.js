import UserList from "./model.js";
import View from "./view.js";

class Controller{
    constructor(){
        this.userList=new UserList();
        this.view=new View();
      
        this.view.getBtn.addEventListener("click",(e)=>this.getUser(e));
        this.view.postBtn.addEventListener("click",(e)=>this.postUser(e));
       
        this.view.setEditClickHandler(this.handleEditClick.bind(this))
        this.view.setDeleteClickHandler(this.handleDeleteClick.bind(this));

    }

   //get
    getUser(e){
    e.preventDefault();
    
    if(this.view.isLoading){
        this.view.showLoading();
  
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response=>response.json())
      .then(data=>{
        this.isLoading=false;
        this.userList.getUser(data);
        localStorage.setItem("userList",JSON.stringify(this.userList.users))
        console.log(this.userList.users.length+ " users found");
        this.view.displayUsers(this.userList.users)
      }).catch(err=>{
          container.innerHTML="Trouble in fetching data!"
      })
    } 
    else
      hideLoading();
    }
   

    //delete
    handleDeleteClick(userId) {
        console.log(userId);
        const index = this.userList.getUserById(userId);
    
        if (index !== -1) {
          
    
          // Delete the user data from the server
          fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              if (response.status === 200) {
                this.userList.deleteUser(userId);
                this.view.deleteUserFromDOM(userId);
                console.log("Item with id-" + userId + " deleted successfully.");
                alert("Item with id-" + userId + " deleted successfully.");
                localStorage.setItem("userList", JSON.stringify(this.userList.users));
              } else {
                console.error("Error deleting user:", response.statusText);
              }
            })
            .catch((error) => {
              console.error("Error deleting user:", error);
              alert("Error deleting user with id-" + userId + ":", error);
            });
        }
      }

    //edit
     handleEditClick(userId){
        const index=this.userList.getUserById(userId);

        if(index!==-1){

            const userToEdit=this.userList.users[index];

            this.view.populateEditForm(userToEdit);

            // Show the edit form
            this.view.showEditForm();
      
            // Attach an event listener to handle the edit process
            this.view.setEditProcessHandler((event) => {
              this.editUserData(userId, event);
            });
        }
     }

     editUserData(userId, event) {
        event.preventDefault();
    
        // Create an editedUser object with the updated values
        const editedUser = {
          id: userId,
          name: document.getElementById("nameEdit").value,
          username: document.getElementById("usernameEdit").value,
          email: document.getElementById("mailEdit").value,
          phone:document.getElementById("phoneEdit").value,
          address:{
            street:document.getElementById("streetEdit").value,
            suite:document.getElementById("suiteEdit").value,
            city:document.getElementById("cityEdit").value,
            zipcode:document.getElementById("zipcodeEdit").value,
            geo:{
                lat:parseFloat(document.getElementById("latEdit").value),
                lng:parseFloat(document.getElementById("lonEdit").value)
                }
            },
          website:document.getElementById("websiteEdit").value,
          company:{
            name:document.getElementById("companyNameEdit").value,
            catchPhrase:document.getElementById("catchPhraseEdit").value,
            bs:document.getElementById("bsEdit").value
          }
         };
    
        // Send a PUT request to update the user data
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editedUser),
        })
          .then((response) => response.json())
          .then((data) => {
            // Update the model with the edited user data
            this.userList.updateUser(userId, data);
    
            // Update the view with the edited user data
            this.view.updateUserInDOM(data);
    
            // Hide the edit form
            this.view.editBoxFieldsReset();
            this.view.hideEditForm();
    
            // Alert the user about the successful update
            alert("Item with id-" + userId + " updated successfully.");
          })
          .catch((error) => {
            console.error("Error updating user:", error);
            alert("Error updating user with id-" + userId + ":", error);
          });
      }
    
    //post
    postUser(e){
    e.preventDefault();
    // this.view.showPostBox();

    const name=document.getElementById("name").value;
    const username=document.getElementById("username").value;
    const email=document.getElementById("mail").value;
    const phone=document.getElementById("phone").value;
    const street=document.getElementById("street").value;
    const suite=document.getElementById("suite").value;
    const zipcode=document.getElementById("zipcode").value;
    const website=document.getElementById("website").value;
    const city=document.getElementById("city").value;
    const lat=document.getElementById("lat").value;
    const lng=document.getElementById("lon").value;
    const companyName=document.getElementById("companyName").value;
    const catchPhrase=document.getElementById("catchPhrase").value;
    const bs=document.getElementById("bs").value;

    const newPost=
        
         {
            id:this.userList.users.length+1,
            name:name,
            username: username,
            email:email,
            address: {
              street: street,
              suite: suite,
              city: city,
              zipcode: zipcode,
              geo: {
                lat:lat,
                lng: lng
              }
            },
            phone:phone,
            website:website,
            company: {
              name:companyName,
              catchPhrase: catchPhrase,
              bs: bs
            }
          }
    
    fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newPost),
  })
    .then((response) => response.json())
    .then((data) => {
        
      console.log("Post response:", data);
      this.userList.postUser(
        newPost.id,name, 
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

     alert("item with name"+data.name+" posted successfully");
     console.log("item with name"+data.name+" posted successfully");
     this.view.postBoxFieldsReset();
     this.view.hidePostBox();
      this.view.postUserInDOM(newPost);
      localStorage.setItem("userList",JSON.stringify(this.userList.users))
      console.log(this.userList.users.length," users found");
      
      
    })
    .catch((error) => {
      console.error("Error posting data:", error);
      alert("Error posting data:", error);
    });
    }
}

export default Controller;