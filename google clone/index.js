
//hamburger toggle

const mainMenu=document.getElementById("hamburger");
const leftIconOnly=document.getElementById("left-only-icons");
const section=document.querySelector(".section");
const topBar=document.getElementById("top");
const count=document.querySelectorAll(".count");
const name=document.querySelectorAll("#name");
const labelName=document.getElementById("label-name");
const composeBtn=document.getElementById("compose-icon");
const option=document.querySelectorAll(".name-only-icon");
let menuOpen=false;
 function menuDisplay()
{
    console.log("clicked main menu");
    if(!menuOpen){
            composeBtn.style.marginLeft="20px"
            
            name.forEach(name=>{name.style.display="block"; name.style.marginLeft="10px";})
            count.forEach(count=>count.style.display="block")
            labelName.style.display="block";
            leftIconOnly.style.width="20%"
            section.style.left="20%";
            section.style.width="76%";
            topBar.style.left="20%"
            topBar.style.width="76%"
            option.forEach(op=>{op.style.borderRadius="20px";op.style.width="100%"})
             document.querySelectorAll(".mail-icon").forEach(icon=>icon.style.fontSize="17px")
           
            if (leftIconOnly.style.width === "20%") {
                leftIconOnly.removeEventListener("mouseenter", mouseEnterHandler);
                leftIconOnly.removeEventListener("mouseleave", mouseLeaveHandler);
              }
            
              menuOpen=true;
        }
        else{
            composeBtn.style.marginLeft="0px"
            option.forEach(op=>{op.style.borderRadius="50%";op.style.width="90%"})

            name.forEach(name=>{name.style.display="none"; name.style.marginLeft="0px";})
            count.forEach(count=>count.style.display="none")
            labelName.style.display="none";
            leftIconOnly.style.width="6%"
            section.style.left="6%";
            section.style.width="90%";
            topBar.style.left="6%"
            topBar.style.width="90%"
            document.querySelectorAll(".mail-icon").forEach(icon=>icon.style.fontSize="18px")

            leftIconOnly.addEventListener("mouseenter",mouseEnterHandler)
            leftIconOnly.addEventListener("mouseleave",mouseLeaveHandler)
            menuOpen=false;
        }
}


//mouse enter and leave

function mouseEnterHandler(){
    composeBtn.style.marginLeft="20px"
            
    name.forEach(name=>{name.style.display="block"; name.style.marginLeft="10px";})
    count.forEach(count=>count.style.display="block")
    labelName.style.display="block";
    leftIconOnly.style.width="20%"
    option.forEach(op=>{op.style.borderRadius="20px";op.style.width="100%"})
     document.querySelectorAll(".mail-icon").forEach(icon=>icon.style.fontSize="17px")
    
}

function mouseLeaveHandler(){
    composeBtn.style.marginLeft="0px"
    option.forEach(op=>{op.style.borderRadius="50%";op.style.width="90%"})

    name.forEach(name=>{name.style.display="none"; name.style.marginLeft="0px";})
    count.forEach(count=>count.style.display="none")
    labelName.style.display="none";
    leftIconOnly.style.width="6%"
    document.querySelectorAll(".mail-icon").forEach(icon=>icon.style.fontSize="18px")

}



if (leftIconOnly.style.width === "20%") {
    leftIconOnly.removeEventListener("mouseenter", mouseEnterHandler);
    leftIconOnly.removeEventListener("mouseleave", mouseLeaveHandler);
  }


//right

const rightSide=document.querySelector("#right");
const hideButton=document.querySelector(".hide");
const hideIcon=document.querySelector(".hide-icon");
isClicked=false;
hideButton.addEventListener("click",()=>{

    if(!isClicked)
    {
      rightSide.style.display="none";
      hideIcon.innerHTML=" chevron_left";
      section.style.width="80%"
      topBar.style.width="80%"
    section.style.right="0"
    topBar.style.right="0"
      isClicked=true;
    }
    else{
        rightSide.style.display="block";
        hideIcon.innerHTML=" chevron_right";
        section.style.width="76%";
        topBar.style.width="76%";
        section.style.right="4%"
        topBar.style.right="4%"
        isClicked=false;
    }
    if(!menuOpen && isClicked){
      section.style.width="94%"
      topBar.style.width="94%"
      section.style.right="0"
      topBar.style.right="0"
      section.style.left="6%"
      topBar.style.left="6%"
    }
    else if(!menuOpen && !isClicked){
        section.style.width="90%"
        topBar.style.width="90%"
        section.style.right="4%"
        topBar.style.right="4%"
        section.style.left="6%"
        topBar.style.left="6%"
    }
    else if(menuOpen && isClicked){
        section.style.width="80%"
        topBar.style.width="80%"
        section.style.right="0%"
        topBar.style.right="0%"
        section.style.left="20%"
        topBar.style.left="20%"
    }

})




//navbar

var navbar = document.querySelector(".navbar");
var nav = navbar.querySelectorAll(".nav");
for (var i = 0; i < nav.length; i++) {
  nav[i].addEventListener("click", function() {
  var current = document.querySelectorAll(".current");
  if (current.length > 0) { 
    current[0].className = current[0].className.replace(" current", "");
  }
  this.className += " current";
  });
}

//menubar

let optionsIcons=document.querySelector(".options-only-icon");
let optionIcon=optionsIcons.querySelectorAll(".name-only-icon");

for(let i=0;i<option.length;i++){
    
    optionIcon[i].addEventListener("click",function(){
        let active=document.querySelectorAll(".active");
        if(active.length>0){

            active[0].className=active[0].className.replace(" active","");
        }
        this.className+=" active";
    })
}


//mails


class MailStructure{
    constructor(user,subject,message,date,read,starred){
        this.user=user;
        this.subject=subject;
        this.message=message;
        this.read=read;
        this.starred=starred;
        this.date=new Date(date);
    }
    render(index){
        return  `<div class="mail" id="mail-${index}">
        <div class="select-mail">
            <span  class="drag material-symbols-outlined">
                drag_indicator
                </span>
                <input type="checkbox" class="checkbox">
        </div>
        <div class="star-mail">
            <span class="star ${this.starred ? " clicked":""} material-symbols-outlined icons" >star</span>
        </div>
        <div class="user" style="font-weight:${this.read ? "lighter" : "bold"}">${this.user}</div>
        <div class="content">
            <p style="font-weight:${this.read ? "lighter" : "bold"} ">${this.subject.substring(0,30)}.. &nbsp;</p>  
            <small class="message">- ${this.message.substring(0,50)}...</small>
        </div>
        <div class="mail-icons">
        <span class="icons mail-icon material-symbols-outlined" title="archive">
        unarchive
        </span>
        <span class="icons mail-icon material-symbols-outlined" id="delete-icon" title="delete">
        delete
        </span>
        <span class="icons mail-icon material-symbols-outlined" title="mark as read">
        drafts
        </span>
        <span class="icons mail-icon material-symbols-outlined" title="snooze">
        schedule
        </span>
        </div>
        <div class="date">${getMonth(this.date.getMonth()+1)} ${this.date.getDate()}</div>

</div>`
    }
}

function fetchData(){
    let mails=JSON.parse(localStorage.getItem("mailList")) || [];


fetch("/mailList.json")
.then(response=>response.json())
.then(data=>{
    mails=data.mails
    // console.log(mails);
    localStorage.setItem("mailList",JSON.stringify(mails));
    mails.forEach((item,index)=>{
        const {user,subject,message,read,starred,date}=item
        const mailContent=new MailStructure(user,subject,message,date,read,starred)
           
    const mailSpace=document.querySelector(".mails");

    mailSpace.innerHTML+=mailContent.render(index); 

deleteMail();
   })

})
.catch(err=>console.log(err.message))

}
fetchData();

function deleteMail(){
    const deleteBtns = document.querySelectorAll("#delete-icon");
    
    deleteBtns.forEach((deleteBtn) => {
      
      deleteBtn.addEventListener("click", (e) => {
          console.log("this item gonna remove");
        const mailElement = e.target.parentNode.parentNode;
        
        if (mailElement) {
          mailElement.remove();
        }
      
      });
    });
}

//compose area 


const compose=document.querySelector("#compose");
const composeSection=document.querySelector("#compose-box");
const closeButton=document.querySelector(".close-button");
const composeIcon=document.querySelector("#compose-icon");

composeIcon.addEventListener("click",()=>{
    composeSection.style.display="block";
})
closeButton.addEventListener("click",()=>{
    composeSection.style.display="none";
})

const send=document.querySelector("#send");
send.addEventListener("click",()=>{
    composeSection.style.display="none";
    console.log("send clicked");
    

   const user=document.querySelector("#reciever");
   const subject=document.querySelector("#subject");
   const content=document.querySelector("#content");

   const newEntry={
    user:user.value,
    subject:subject.value,
    message:content.value,
    date:new Date().toISOString().slice(0,10),
    read:false,
    starred:false
   }

   addNewEntryToMailbox(newEntry);  

   reciever.value="";
   subject.value="";
   content.value="";

  

})

// add a new entry to the mailbox

  

function addNewEntryToMailbox(newEntry) {

    storedMails=JSON.parse(localStorage.getItem("mailList")) || [];
    console.log(storedMails);
    storedMails.push(newEntry);
    console.log(storedMails);
    localStorage.setItem("mailList",JSON.stringify(storedMails))
    
    const {user,subject,message,date,read,starred}=newEntry;
    const mailContent=new MailStructure(user,subject,message,date,read,starred);

    const mailSpace=document.querySelector(".mails");
    
    mailSpace.innerHTML+=mailContent.render(storedMails.length-1);
    
    deleteMail();
    
  }
 

function getMonth(prop){

    switch(prop){
        case 1:return "Jan";
        case 2:return "Feb";
        case 3:return "Mar";
        case 4:return "Apr";
        case 5:return "May";
        case 6:return "Jun";
        case 7:return "Jul";
        case 8:return "Aug";
        case 9:return "Sep";
        case 10:return "Oct";
        case 11:return "Nov";
        case 12:return "Dec";
    }
}


//more

const moreBtn=document.querySelector(".more");
const moreName=document.querySelector(".more-name");
const moreIcons=document.querySelectorAll(".more-icons");
moreClick=false;
moreBtn.addEventListener("click",()=>{

    if(!moreClick){
        moreName.textContent="less";
        moreIcons.forEach(item=>{
            item.style.display="block";

        })
        moreClick=true;
        
    }
    else{
        moreName.textContent="more";
        moreIcons.forEach(item=>{
            item.style.display="none";

        })
        moreClick=false;
    }
})



  
 


  


// checkboxes.forEach((checkbox, index) => {
//   checkbox.addEventListener("change", () => {
//     const mailElement = document.getElementById(`mail-${index}`);
//     if (checkbox.checked) {
//       mailElement.style.backgroundColor = "rgb(234, 241, 251)";
//     } else {
//       mailElement.style.backgroundColor = "rgb(255, 255, 255)";
//     }
//   });
// });

// // Function to initialize event listeners for checkboxes
// function initializeCheckboxes() {
//     const checkboxes = document.querySelectorAll(".checkbox");
  
//     checkboxes.forEach((checkbox, index) => {
//       checkbox.addEventListener("change", () => {
//         updateBackgroundColor(checkbox);
//       });
//     });
//   }
  
//   // Select all check boxes
//   const selectAll = document.getElementById("select-all");
//   const checkboxes = document.querySelectorAll(".checkbox");
  
//   selectAll.addEventListener("change", () => {
//     const isChecked = selectAll.checked;
  
//     checkboxes.forEach((checkbox) => {
//       checkbox.checked = isChecked;
//       updateBackgroundColor(checkbox);
//     });
//   });
  
//   function updateBackgroundColor(checkbox) {
//     const mailElement = checkbox.closest(".mail"); // Find the closest parent with class "mail"
//     if (mailElement) {
//       if (checkbox.checked) {
//         mailElement.style.backgroundColor = "rgb(234, 241, 251)";
//       } else {
//         mailElement.style.backgroundColor = "rgb(255, 255, 255)";
//       }
//     }
//   }