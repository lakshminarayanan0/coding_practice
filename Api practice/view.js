
class View{
    constructor(){
     

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

    displayUsers(users){
      this.container.innerHTML="";
      users.forEach(user => this.container.innerHTML+=this.createUserDom(user));
    }
     postUserInDOM(user) {
      this.container.innerHTML += this.createUserDom(user);
    }
    setDeleteClickHandler(callback) {
      this.container.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete")) {
          const userId=e.target.closest(".item").id;
          callback(userId);
        }
      });
    }
 
    deleteUserFromDOM(id) {
      const itemToRemove = document.getElementById(id);
      if (itemToRemove) {
        itemToRemove.remove();
      }
    }

      setEditClickHandler(callback) {
        this.container.addEventListener("click",(e)=>{
          if(!this.isEditBoxVisible && !this.isPostBoxVisible){
          if(e.target.classList.contains("edit")){
          
          const id=e.target.closest(".item").id;
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
      
    
    updateUserInDOM(user) {
      const existingItem = document.getElementById(user.id);
      if (existingItem) {
        const userHTML=this.editUserDom(user);
        existingItem.innerHTML=userHTML;
      
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