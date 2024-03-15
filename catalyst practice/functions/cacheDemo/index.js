"use strict"

const express = require('express');
const catalyst = require('zcatalyst-sdk-node');

const app = express();
app.use(express.json());

app.post("/cache", (req, res) => {

    const catalystApp = catalyst.initialize(req);

	const requestQuery = req.body;

	//Get Segment instance with segment ID (If no ID is given, Default segment is used)
	let segment = catalystApp.cache().segment();
	//Insert Cache using put by passing the key-value pair.
	let cachePromise = segment.put("details",requestQuery);

	cachePromise
		.then((cache) => {
			console.log("\nInserted Cache : " + JSON.stringify(cache));
			res.status(200).json(cache);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});

});

app.post("/datastore", (req, res) => {

    let catalystApp = catalyst.initialize(req, {type: catalyst.type.applogic});

	const requestBody = req.body;

	//Get table meta object without details.
	let table = catalystApp.datastore().table('SampleTable');

	//Use Table Meta Object to insert the row which returns a promise
	let insertPromise = table.insertRow({
		Name: requestBody.name,
		Age: requestBody.age,
		SearchIndexedColumn: requestBody.id
	});

	insertPromise
		.then((row) => {
			console.log("\nInserted Row : " + JSON.stringify(row));
			res.status(200).json(row);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).send(err);
		});
});

app.get('/users',(req,res)=>{
	const catalystApp=catalyst.initialize(req)
	const userManagement = catalystApp.userManagement();
    userManagement.getAllRows().then(data=>res.json({success:true,response:data}))
})

app.get("/datastore",(req,res)=>{

   
	let catalystApp=catalyst.initialize(req);
	let datastore=catalystApp.datastore()
	let table=datastore.table("users")

    let rowPromise=table.getAllRows();
    rowPromise.then(data=>res.status(200).json({success:true,response:data})).catch(err=>res.status(500).send(err))
	
})

app.get("/datastore/:id",(req,res)=>{
	const id=req.params.id;
	const catalystApp=catalyst.initialize(req);
    const zcql=catalystApp.zcql()
	const query=`select * from users where userId=${id}`
	
	const getPromise=zcql.executeZCQLQuery(query);
	getPromise.then(data=>res.status(200).json({success:true,response:data})).catch(err=>res.status(500).send(err))
})



app.put("/datastore/:id", (req, res) => {
    const catalystApp = catalyst.initialize(req);
    const id = req.params.id;
    const updatedData = req.body;

    const zcql = catalystApp.zcql();
    const query = `select * from users where userId=${id}`;

    const getPromise = zcql.executeZCQLQuery(query);

    getPromise.then(data => {
        if (Object.keys(data).length !== 0) {
           let updateQuery;

            if (updatedData.name && updatedData.age) {
              updateQuery = `update users set name='${updatedData.name}', age=${updatedData.age} where userId=${id}`;
            }
            if (updatedData.name) {
                updateQuery = `update users set name='${updatedData.name}' where userId=${id}`;
            }
            if (updatedData.age) {
                updateQuery = `update users set age=${updatedData.age} where userId=${id}`;
            }

            const updatePromise = zcql.executeZCQLQuery(updateQuery);

            updatePromise.then(() => {
                res.status(200).json({ success: true, message: `${id} updated successfully.` });
            }).catch(err => {
                res.status(500).json({ message: err.message });
            });
        } else {
            res.status(404).json({ success: false, message: `${id} not found in user list.` });
        }
    }).catch(err => {
        res.status(500).json({ message: err.message });
    });
});

app.all("/", (req,res) => {

	res.status(200).send("I am Live and Ready.");

});

module.exports = app;
