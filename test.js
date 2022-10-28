const mongoose = require('mongoose')
const url = "mongodb://192.168.8.101"

mongoose.connect(url ,(err)=>{
	console.log(err)	
})
