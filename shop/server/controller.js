const { userChoice, homepage } = require("./clientRequests");


async function login(data){
  const isLogin=await authandlogin(data)
  if(isLogin){
    console.log("user login successful...");
    
    // userChoice()
  }else{
    console.log("user login unsuccessfull")
  }
}
async function authandlogin(data){
    const user={
        username:data.username,
        password:data.password
    }
    try{
      const authenticate=await fetch('http://localhost:8000/signin',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        credentials: 'include',
        body:JSON.stringify(user)
      })
      console.log(await authenticate.json());

      if(!authenticate.ok){
       
        throw new Error("user not found")
        
      }
   
      console.log("authenticated successfully",authenticate.ok);
      return true

    }catch(err){
        console.log(err);
        return false
    }
}

module.exports={
  login
}


