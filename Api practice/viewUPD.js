import Controller from "./controllerUPD.js";

class View{
    constructor(){
      this.controller=new Controller();

      this.container=document.querySelector(".data-container");
      this.getBtn=document.getElementById("get");
      this.postBtn=document.getElementById("post");
      this.loader=document.querySelector(".loader");
      this.isLoading=true;

      //edit box
      this.editForm=document.querySelector(".edit-box");
      this.editPostBtn = document.getElementById("updatepost");
      this.isEditBoxVisible=false;

      //post box

      this.postBox = document.querySelector(".post-box");
      this.postBoxBtn = document.getElementById("post-box-btn");
      this.postBtn = document.getElementById("post");
      this.isPostBoxVisible = false;

      this.postBoxBtn.addEventListener("click", this.togglePostBox.bind(this));

      this.getBtn.addEventListener("click",(e)=>{
      
        this.showLoading();
     
        this.displayUsers(e)
      });

      this.postBtn.addEventListener("click",(e)=>this.postUserInDOM(e));
     
      this.setEditClickHandler(this.handleEditClick.bind(this))
      this.setDeleteClickHandler(this.deleteUserFromDOM.bind(this));

    }

    showPostBox(){
      this.postBox.style.display = "block";
        this.isPostBoxVisible = true;
    }
    hidePostBox(){
      this.postBox.style.display = "none";
        this.isPostBoxVisible = false;
    }

    togglePostBox() {
      if (!this.isPostBoxVisible && !this.isEditBoxVisible) {
        this.showPostBox();
       
      } else {
        this.hidePostBox();
      }
    }

    showLoading(){
      this.loader.style.display="block"
    }

    hideLoading(){
      this.loader.style.display="none"
    }

    populateEditForm(user) {
     
      document.getElementById("nameEdit").value = user.name;
      document.getElementById("usernameEdit").value = user.username;
      document.getElementById("mailEdit").value = user.email;
      document.getElementById("phoneEdit").value = user.phone;
      document.getElementById("streetEdit").value = user.address.street;
      document.getElementById("suiteEdit").value = user.address.suite;
      document.getElementById("zipcodeEdit").value = user.address.zipcode;
      document.getElementById("websiteEdit").value = user.website;
      document.getElementById("cityEdit").value = user.address.city;
      document.getElementById("latEdit").value = user.address.geo.lat;
      document.getElementById("lonEdit").value = user.address.geo.lng;
      document.getElementById("companyNameEdit").value = user.company.name;
      document.getElementById("catchPhraseEdit").value = user.company.catchPhrase;
      document.getElementById("bsEdit").value = user.company.bs;
    }
    showEditForm(){
      this.editForm.style.display="block";
    }
    hideEditForm(){
      this.editForm.style.display="none";
    }

    //display users
    async displayUsers(e){
      
      const users=await this.controller.getUser(e);
     
       this.hideLoading();
       this.container.innerHTML="";
       if(typeof users ==="string"){
        this.container.innerHTML=users;

       }
       else
       {
        this.container.innerHTML="";
        users.forEach(user => this.container.innerHTML+=this.createUserDom(user));
       }
  
    }

    //post new users
     async postUserInDOM(e) {
     e.preventDefault();
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
            id:Math.floor(Math.random() * 900) + 100,
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
          this.postBoxFieldsReset();
          this.hidePostBox();

      const isPosted=await this.controller.postUser(newPost);
      // console.log(isPosted);
      if(isPosted){
        alert("item with name "+newPost.name+" posted successfully");
        this.container.innerHTML += this.createUserDom(newPost);
      }
      else{
        alert("item with name "+newPost.name+" failed to post.");
      }
      
      
    }

    //delete users
    setDeleteClickHandler(callback) {
      this.container.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
          const userId=e.target.closest(".item").id;
          callback(userId);
        }
      });
    }

 
    async deleteUserFromDOM(id) {
      console.log(id+" selected to delete.");
     const isDelete=await this.controller.deleteUser(id);
     if(isDelete){
      alert("Item with id-" + id + " deleted successfully.");
      const itemToRemove = document.getElementById(id);
      if (itemToRemove) {
        itemToRemove.remove();
      }
     }else{
      alert("Failed to delete item with id-" + id + ".");
     }
     
    }

    //edit exising users
      setEditClickHandler(callback) {
        this.container.addEventListener("click",(e)=>{
          if(!this.isEditBoxVisible && !this.isPostBoxVisible){
          if(e.target.classList.contains("edit")){
          
          const id=parseInt(e.target.closest(".item").id);
          
          console.log("edit clicked at "+id);
          callback(id);
          }
        }
        else{
          this.hideEditForm();
            this.isEditBoxVisible=false;
        }
        })
      }
   
        setEditProcessHandler(callback) {
          const editUi = (event) => {
              event.preventDefault(); 
              callback(event);
              this.editPostBtn.removeEventListener("click", editUi);
          };
          
          this.editPostBtn.addEventListener("click", editUi);
      }
      

      handleEditClick(userId){
           
            const userToEdit=this.controller.findUserToEdit(parseInt(userId));
            this.populateEditForm(userToEdit);
            this.showEditForm();
      
            // Attach an event listener to handle the edit process
            this.setEditProcessHandler((event) => {
              this.updateUserInDOM(userId);
            });
        }


   async updateUserInDOM(userId) {
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

        // Hide the edit form
        this.editBoxFieldsReset();
        this.hideEditForm();

    const isEdited=await this.controller.editUser(userId,editedUser);
    if(isEdited){
           
      const existingItem = document.getElementById(userId);
      if (existingItem) {

        const userHTML=this.editUserDom(editedUser);
        existingItem.innerHTML=userHTML;
        alert("Item with id-" + userId + " updated successfully.");
      
      }
    }else{
      alert("Error updating user with id-" + userId + ":", error);
    }
    }

    createUserDom(user){
        return `<div class="item m-2" id=${user.id}>
        <div class="card" style="width: 60%;">
            
            <div class="card-body text-white " style="background:linear-gradient(15deg,rgb(8, 8, 54),rgb(4, 81, 117)) ;">
              <div class="card-head text-start " style="border-bottom: 1px solid ghostwhite;">
                <h3 class="card-title  text-capitalize ">${user.name}</h3>
              <h4 class="card-title  text-capitalize">${user.username}</h4>
              </div>
              <div class="row">
                <div class="col border-left: 1px solid ghostwhite;">
                    <div class="card-text text-start text-capitalize">
                        <address>
                        <h4>Address</h4>
                        <p><strong>street:</strong><span>${user.address.street}</span></p>
                        <p><strong>suite:</strong><span>${user.address.suite}</span></p>
                        <p><strong>city:</strong><span>${user.address.city}</span></p>
                        <p><strong>zipcode:</strong><span>${user.address.zipcode}</span></p>
                        <p><strong>phone:</strong><span>${user.phone}</span></p>
                        <p><strong>Reach me here: </strong><a href="mailto:${user.email}" class="text-decoration-none text-white">${user.email}</a></p>
        
                        <p><strong>location:</strong><span>lat${user.address.geo.lat}</span> <span>long-${user.address.geo.lng}</span></p>
                        <p><strong>Take a look :</strong><a href="${user.website}" class="text-decoration-none text-white">${user.website}</a></p>
                      </address>
                      </div>
                </div> 
             
            <div class="col d-flex flex-column justify-center align-items-center" style="border-left: 1px solid ghostwhite;">
                  
              <div class="company-details text-start text-capitalize" style="height:80%">
                <p><strong>company name:</strong><span>${user.company.name}</span></p>
                <p><strong>catch phrases: </strong><span>${user.company.catchPhrase}</span></p>
                <p><strong>bs: </strong><span>${user.company.bs}</span></p>
        
              </div>
              <div class="actions " style="height: 20%;">
                <div class="btn btn-warning edit" data-userid="${user.id}">EDIT</div>
                <div class="btn btn-danger delete" data-userid="${user.id}">DELETE</div>
              </div>
            </div>
            </div>
            </div>
            
          </div>
        </div>
        `
    }

    editUserDom(user){
      return `
      <div class="card" style="width: 60%;">
          
          <div class="card-body text-white " style="background:linear-gradient(15deg,rgb(8, 8, 54),rgb(4, 81, 117)) ;">
            <div class="card-head text-start " style="border-bottom: 1px solid ghostwhite;">
              <h3 class="card-title  text-capitalize ">${user.name}</h3>
            <h4 class="card-title  text-capitalize">${user.username}</h4>
            </div>
            <div class="row">
              <div class="col border-left: 1px solid ghostwhite;">
                  <div class="card-text text-start text-capitalize">
                      <address>
                      <h4>Address</h4>
                      <p><strong>street:</strong><span>${user.address.street}</span></p>
                      <p><strong>suite:</strong><span>${user.address.suite}</span></p>
                      <p><strong>city:</strong><span>${user.address.city}</span></p>
                      <p><strong>zipcode:</strong><span>${user.address.zipcode}</span></p>
                      <p><strong>phone:</strong><span>${user.phone}</span></p>
                      <p><strong>Reach me here: </strong><a href="mailto:${user.email}" class="text-decoration-none text-white">${user.email}</a></p>
      
                      <p><strong>location:</strong><span>lat${user.address.geo.lat}</span> <span>long-${user.address.geo.lng}</span></p>
                      <p><strong>Take a look :</strong><a href="${user.website}" class="text-decoration-none text-white">${user.website}</a></p>
                    </address>
                    </div>
              </div> 
           
          <div class="col d-flex flex-column justify-center align-items-center" style="border-left: 1px solid ghostwhite;">
                
            <div class="company-details text-start text-capitalize" style="height:80%">
              <p><strong>company name:</strong><span>${user.company.name}</span></p>
              <p><strong>catch phrases: </strong><span>${user.company.catchPhrase}</span></p>
              <p><strong>bs: </strong><span>${user.company.bs}</span></p>
      
            </div>
            <div class="actions " style="height: 20%;">
              <div class="btn btn-warning edit" data-userid="${user.id}">EDIT</div>
              <div class="btn btn-danger delete" data-userid="${user.id}">DELETE</div>
            </div>
          </div>
          </div>
          </div>
          
        </div>
      
      `
  }

    postBoxFieldsReset(){

        document.getElementById("name").value = "";
        document.getElementById("username").value = "";
        document.getElementById("mail").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("street").value = "";
        document.getElementById("suite").value = "";
        document.getElementById("zipcode").value = "";
        document.getElementById("website").value = "";
        document.getElementById("city").value = "";
        document.getElementById("lat").value = "";
        document.getElementById("lon").value = "";
        document.getElementById("companyName").value = "";
        document.getElementById("catchPhrase").value = "";
        document.getElementById("bs").value = "";
      }
      editBoxFieldsReset(){

        document.getElementById("nameEdit").value = "";
        document.getElementById("usernameEdit").value = "";
        document.getElementById("mailEdit").value = "";
        document.getElementById("phoneEdit").value = "";
        document.getElementById("streetEdit").value = "";
        document.getElementById("suiteEdit").value = "";
        document.getElementById("zipcodeEdit").value = "";
        document.getElementById("websiteEdit").value = "";
        document.getElementById("cityEdit").value = "";
        document.getElementById("latEdit").value = "";
        document.getElementById("lonEdit").value = "";
        document.getElementById("companyNameEdit").value = "";
        document.getElementById("catchPhraseEdit").value = "";
        document.getElementById("bsEdit").value = "";
      }
}

export default View;