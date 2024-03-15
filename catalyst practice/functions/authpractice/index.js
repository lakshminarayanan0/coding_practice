'use strict';

const catalyst=require('zcatalyst-sdk-node');
const express=require('express');
const { USER_STATUS } = require('zcatalyst-sdk-node/lib/user-management/user-management');
const expressApp=express()
const cors=require('cors')

expressApp.use(express.json())
expressApp.use(cors())

expressApp.get('/greet',(req,res)=>{
	console.log("greet");
	return res.send("<h3> successfully logged out. </h3> <a href=`http://localhost:3000/__catalyst/auth/login`>click here to login</a>")
})

expressApp.get('/orgusers/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const id=req.params.id
	const userManagement=app.userManagement()
	userManagement.getAllUsers(id).then(users=>{
		console.log(users);
		return res.json(users)
	}).catch(err=>res.json({err:err}))
	
})
expressApp.get("/authusers",(req,res)=>{
	const app=catalyst.initialize(req)
	const userManagement=app.userManagement()
	
	userManagement.getAllUsers().then(users=>{
		console.log(users);
		return res.json(users)
	}).catch(err=>res.json({err:err}))
})

expressApp.get('/authusers/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const userManagement=app.userManagement()

	userManagement.getUserDetails(req.params.id).then(user=>{
		console.log(user);
		return res.json(user)
	}).catch(err=>res.json({err:err}))
})

expressApp.post('/authusers',(req,res)=>{
	
	const app=catalyst.initialize(req)
	const newUser=req.body
	const userManagement=app.userManagement()

    const signUpConfig={
		platform_type:"web",
		template_details: {
			subject: 'Welcome to %APP_NAME%',
			message: '<p>Login link to %APP_NAME% : </p><a href="%LINK%">%LINK%</a>'
		}
	}
	// const userConfig={newUser}
   
	const registerPromise=userManagement.addUserToOrg(signUpConfig,newUser)
    registerPromise.then(user=>{
		console.log(user);
		return res.status(200).json({success:true,response:user})
	}).catch(err=>{
		console.log(err);
		return res.status(500).json({success:false,response:err})
	})
})

expressApp.get('/authusers/vali/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const id=req.params.id
	const userManagement=app.userManagement()

	userManagement.getUserDetails(req.params.id).then(user=>{
		console.log(user);
		if(!user) return res.status(404).json({success:true,message:`${id} not found in usersList`})
		const valUser={ email_id:user.email_id, org_id:user.org_id,first_name:user.first_name,last_name:user.last_name,role_details:user.role_details}
		userManagement.getSignupValidationRequest(valUser)
		.then(response=>res.status(200).json({success:true,message:response}))
	}).catch(err=>res.json({err:err.message}))
	
})


expressApp.put('/authusers/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const userManagement=app.userManagement()
   const userId=req.params.id
   const toUpdate=req.body

	userManagement.getUserDetails(userId).then(user=>{
		console.log(user);
        if(!user){
          return res.status(404).json({success:false,message:`${userId} does not exists in authenticated userList.`})
		}
		const userDetails={
			first_name:user.first_name,
			last_name:user.last_name,
			zaaid:user.zaaid,
			email_id:user.email_id,
			role_id:user.role_details.role_id
		}
		const updateUserDetails={...userDetails,...toUpdate}
		// return res.json(updateUserDetails)
		return userManagement.updateUserDetails(userId,updateUserDetails)
		       .then(isUpdated=>res.status(200).json({success:true,message:`${userId} updated successfully.`}))
	}).catch(err=>res.json({err:err}))

})

expressApp.delete('/authusers/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const userManagement=app.userManagement()
    const userId=req.params.id
	userManagement.deleteUser(userId).then(deletedUser=>{
		console.log(deletedUser);
		res.json(deletedUser)
	}).catch(err=>res.json(err))
})

expressApp.get('/authusers/enable/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const userId=req.params.id
	const userManagement=app.userManagement()
	userManagement.updateUserStatus(userId,USER_STATUS.ENABLE).then(response=>res.status(200).json({message:`${userId}  is enabled.`,response:response}))
})

expressApp.get('/authusers/disable/:id',(req,res)=>{
	const app=catalyst.initialize(req)
	const userId=req.params.id
	const userManagement=app.userManagement()
	userManagement.updateUserStatus(userId,USER_STATUS.DISABLE).then(response=>res.status(200).json({message:`${userId}  is disabled.`,response:response}))
})

module.exports=expressApp