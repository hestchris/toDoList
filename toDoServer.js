const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');

const app = express();


// connect to mongoose
mongoose.connect('mongodb://localhost/mongoose-todo');

// chreate Schema
let newItem = new mongoose.Schema ({
	userInput: {type: String, required: true},
	completeTask: {type: Boolean, default: false},
})

// create model
let toDoModel = mongoose.model('todomodel', new item)

app.use(express.static('/public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

// pull current to-do items from database
app.get('/list', function(req, res) {
	toDoModel.find(
		{},
		function(err, userInput) {
			if(err) {
				res.status(500).send(err)
				return console.log(err)
			}
			res.status(200).send(userInput)
		})
})

app.post('/update', function(req, res) {
	toDoModel.update(./findByIdAndUpdate(req.body.task._id,)
		{_id: req.body.task._id },
		{$set: {
			completed: req.body.task._id
		}},
		function(err, update) {
			console.log(update)
			if(err) {
				res.status(500).send(err);
				return console.log(err)
			}
			res.send(update)
		}
	)
})

app.post('/newTask', function(req, res) {
	console.log(req.body);
	let newItem = {
		userInput: req.body.newItem.userInput
		coompleted: req.body.newItem.completed
	}
	new toDoModel(newItem).save(function(err, addedTask) {
		if (err){
			res.status(500).send(err);
			return console.log(err);
		}
		res.send(200).send(addedTask)
	})
})

app.post('/delete', function(req, res) {
	console.log(req.body)
	InputModel.findOneAndRemove(
		{_id: req.body.id},
		function(err, removedTask){
		if(err) {
	        res.status(500).send(err);
	        return console.log(err);
		}
		console.log('successfully removed task', removedTask)
		res.send(removedTask)
	})
})


app.listen(3030, function() {
	console.log('server running on port 3030')
})