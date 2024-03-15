const container=document.querySelector(".data-container");
const loader=document.querySelector(".loader");
const getBtn=document.getElementById("get");

getBtn.addEventListener("click",getData);
const userList=[];
console.log(userList.length+" users found");


const clear=document.getElementById("clear");
clear.addEventListener("click",()=>{
  localStorage.removeItem("userList");
})

function showLoading(){
    loader.style.display="block"
}

function hideLoading(){
    loader.style.display="none"
}
isLoading=true;
function getData(e){
  e.preventDefault();
    if(isLoading){
      showLoading();
    
    // sessionStorage.setItem("userList",[]);

        fetch("https://jsonplaceholder.typicode.com/users")
    .then(response=>response.json())
    .then(data=>{
      isLoading=false;
      
        container.innerHTML="";
        data.forEach(item => userList.push(item))
        localStorage.setItem("userList",JSON.stringify(userList))
        console.log(userList.length+ " users found");
        render(userList);
        

    }).catch(err=>{
        container.innerHTML="Trouble in fetching data!"
    })
  } else
    hideLoading();


    
}

//postbox

const postBox=document.querySelector(".post-box");
const postBoxBtn=document.getElementById("post-box-btn")
const editPostBtn = document.getElementById("updatepost");
const postBtn=document.getElementById("post");
isPostBoxVisible=false;
postBoxBtn.addEventListener("click",()=>{
 

if(!isPostBoxVisible){
    postBox.style.display="block";
    isPostBoxVisible=true;
    postBtn.style.display="block";
    editPostBtn.style.display="none"
}
else{
    postBox.style.display="none";
    isPostBoxVisible=false;
}
})



  

//post
lastUserID=10;
function postUserInDOM(userHTML) {
  const existingItem = container
    existingItem.innerHTML += userHTML;
}

postBtn.addEventListener("click",postData);

function postData(e){
    e.preventDefault();
    postBox.style.display="none";


    let name=document.getElementById("name").value;
    let userName=document.getElementById("username").value;
    let mail=document.getElementById("mail").value;
    let phone=document.getElementById("phone").value;
    let street=document.getElementById("street").value;
    let suite=document.getElementById("suite").value;
    let zipcode=document.getElementById("zipcode").value;
    let website=document.getElementById("website").value;
    let city=document.getElementById("city").value;
    let lat=document.getElementById("lat").value;
    let lon=document.getElementById("lon").value;
    let companyName=document.getElementById("companyName").value;
    let catchPhrase=document.getElementById("catchPhrase").value;
    let bs=document.getElementById("bs").value;
   
    const newPost=
        
         {
            id:lastUserID+1,
            name:name,
            username: userName,
            email:mail,
            address: {
              street: street,
              suite: suite,
              city: city,
              zipcode: zipcode,
              geo: {
                lat:lat,
                lng: lon
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
    
     lastUserID++;
   
    

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
      userList.push(newPost)

     alert("item with name"+data.name+" posted successfully");
     const userHTML= createDomElement(data);
     postUserInDOM(userHTML)
      localStorage.setItem("userList",JSON.stringify(userList))
      console.log(userList.length," users found");
      
      
    })
    .catch((error) => {
      console.error("Error posting data:", error);
      alert("Error posting data:", error);
    });
   

   postBoxFieldsReset();
}

//delete
container.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        // If the clicked element has the "delete" class, call the deleteData function
        deleteData(e);
    }
});

// Function to delete the user from the DOM
function deleteUserFromDOM(id) {
  const itemToRemove = document.getElementById(id);
  if (itemToRemove) {
    itemToRemove.remove();
  }
}

function deleteData(e){
    e.preventDefault();
    const item=e.target.closest(".item");
    const id=item.id;
    console.log(id," is selected to delete");
    const index=findUserIndexById(id)
    console.log(id+" is found at index:"+index);

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`,{
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
        },
       
    })
    .then((response) => {
        if (response.status === 200) {
            userList.splice(index,1);
            deleteUserFromDOM(id)
            console.log("Item with id-"+id+" deleted successfully.")    
            alert("Item with id-"+id+" deleted successfully.")           
            localStorage.setItem("userList",JSON.stringify(userList))

        } else {
            console.error("Error deleting user:", response.statusText);
        }
    })
    .catch((error) => {
        console.error("Error deleting user:", error);
        alert("Error deleting user with id-"+id+":", error);
    });
}


// Edit data

function updateUserInDOM(user,userHTML) {
  const existingItem = document.getElementById(user.id);
  if (existingItem) {
    existingItem.innerHTML = userHTML;
  }
}
container.addEventListener("click", function (e) {

  isEditOpen=false;

    if (e.target.classList.contains("edit")) {
      if(!isEditOpen){
        editData(e);
        postBtn.style.display="none";
        postBox.style.display = "block";
        editPostBtn.style.display="block";
        isEditOpen=true;
      }else {
        editPostBtn.style.display="none";
        postBox.style.display = "none";
        postBtn.style.display="block";
        console.log("edit is closed");
        isEditOpen=false;
      }
    }
  });


  
  function editData(e) {
    
    const item = e.target.closest(".item");
    const id = item.id;
    console.log(id," is selected to edit");
    const index=findUserIndexById(id);
    console.log(id+" is found at index:"+index);
    if(index!==-1){

      const itemToEdit=userList[index];
    

    // Retrieve the values from the item and populate the form

    const name = itemToEdit.name;
    const username = itemToEdit.username
    const mail = itemToEdit.email;
    const phone = itemToEdit.phone;
    const street = itemToEdit.address.street;
    const suite = itemToEdit.address.suite;
    const zipcode = itemToEdit.address.zipcode;
    const website = itemToEdit.website;
    const city = itemToEdit.address.city;
    const lat = itemToEdit.address.geo.lat;
    const lon = itemToEdit.address.geo.lng;
    const companyName = itemToEdit.company.name;
    const catchPhrase = itemToEdit.company.catchPhrase;
    const bs = itemToEdit.company.bs;
  
    document.getElementById("name").value = name;
    document.getElementById("username").value = username;
    document.getElementById("mail").value = mail;
    document.getElementById("phone").value = phone;
    document.getElementById("street").value = street;
    document.getElementById("suite").value = suite;
    document.getElementById("zipcode").value = zipcode;
    document.getElementById("website").value = website;
    document.getElementById("city").value = city;
    document.getElementById("lat").value = lat;
    document.getElementById("lon").value = lon;
    document.getElementById("companyName").value = companyName;
    document.getElementById("catchPhrase").value = catchPhrase;
    document.getElementById("bs").value = bs;
  

    

    editPostBtn.addEventListener("click", editProcess)
    }
    function editProcess(event){
      
        event.preventDefault();
    
        // Create an editedPost object with the updated values
        const editedPost = {
          id: parseInt(id),
          name: document.getElementById("name").value,
          username: document.getElementById("username").value,
          email: document.getElementById("mail").value,
          address: {
            street: document.getElementById("street").value,
            suite: document.getElementById("suite").value,
            city: document.getElementById("city").value,
            zipcode: document.getElementById("zipcode").value,
            geo: {
              lat: parseFloat(document.getElementById("lat").value),
              lng: parseFloat(document.getElementById("lon").value),
            },
          },
          phone: document.getElementById("phone").value,
          website: document.getElementById("website").value,
          company: {
            name: document.getElementById("companyName").value,
            catchPhrase: document.getElementById("catchPhrase").value,
            bs: document.getElementById("bs").value,
          },
        };
       console.log(id);
// Send a PUT request to update the post
fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(editedPost),
})
  .then((response) => response.json())
  .then((data) => {
      console.log("post Response: ", data)
    userList[index]=data

const userHTML= createDomElement(data)
updateUserInDOM(data,userHTML)
  localStorage.setItem("userList",JSON.stringify(userList))

  // Hide the post box
  postBox.style.display = "none";

  alert("Item with id-" + id + " updated successfully.");

   
  })
  .catch((error) => {
    console.error("Error updating user:", error);
    alert("Error updating user with id-" + id + ":", error);
  });
    

  editPostBtn.removeEventListener("click", editProcess)
  postBoxFieldsReset();
}

}
  

//rendering ui
let posts=""
function render(userList){
    container.innerHTML="";
    userList.forEach(item=>{
      posts=createDomElement(item)
 container.innerHTML+=posts;
 
})

}
console.log(posts);

function createDomElement(data){
  return `<div class="item m-2" id=${data.id}>
<div class="card" style="width: 60%;">
    
    <div class="card-body text-white " style="background:linear-gradient(15deg,rgb(8, 8, 54),rgb(4, 81, 117)) ;">
      <div class="card-head text-start " style="border-bottom: 1px solid ghostwhite;">
        <h3 class="card-title  text-capitalize ">${data.name}</h3>
      <h4 class="card-title  text-capitalize">${data.username}</h4>
      </div>
      <div class="row">
        <div class="col border-left: 1px solid ghostwhite;">
            <div class="card-text text-start text-capitalize">
                <address>
                <h4>Address</h4>
                <p><strong>street:</strong><span>${data.address.street}</span></p>
                <p><strong>suite:</strong><span>${data.address.suite}</span></p>
                <p><strong>city:</strong><span>${data.address.city}</span></p>
                <p><strong>zipcode:</strong><span>${data.address.zipcode}</span></p>
                <p><strong>phone:</strong><span>${data.phone}</span></p>
                <p><strong>Reach me here: </strong><a href="mailto:${data.email}" class="text-decoration-none text-white">${data.email}</a></p>

                <p><strong>location:</strong><span>lat${data.address.geo.lat}</span> <span>long-${data.address.geo.lng}</span></p>
                <p><strong>Take a look :</strong><a href="${data.website}" class="text-decoration-none text-white">${data.website}</a></p>
              </address>
              </div>
        </div> 
     
    <div class="col d-flex flex-column justify-center align-items-center" style="border-left: 1px solid ghostwhite;">
          
      <div class="company-details text-start text-capitalize" style="height:80%">
        <p><strong>company name:</strong><span>${data.company.name}</span></p>
        <p><strong>catch phrases: </strong><span>${data.company.catchPhrase}</span></p>
        <p><strong>bs: </strong><span>${data.company.bs}</span></p>

      </div>
      <div class="actions " style="height: 20%;">
        <div class="btn btn-warning edit" >EDIT</div>
        <div class="btn btn-danger delete" >DELETE</div>
      </div>
    </div>
    </div>
    </div>
    
  </div>
</div>
`
}

//to reset the fileds value to "" after posting data
function postBoxFieldsReset(){

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

//to find index of element using id
function findUserIndexById(id) {
  return userList.findIndex((user) => user.id === parseInt(id));
}

document.addEventListener("DOMContentLoaded", ()=> {
  const button = document.getElementById("back-to-top-button");
  
  // Show the button when the user scrolls down the page
  window.addEventListener("scroll", ()=> {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
          button.style.display = "block";
      } else {
          button.style.display = "none";
      }
  });
  
  // Scroll to the top when the button is clicked
  button.addEventListener("click", function() {
      document.documentElement.scrollTop = 0; 
  });
});