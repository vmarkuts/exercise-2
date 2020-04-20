var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var faker = require ('faker');
faker.locale = 'de';

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

var friends = [];
const defaultFriends = 10;

renderFriends(defaultFriends);

function renderFriends(num){
	for (var i = 0; i < num; i++) {
		var randomFullName = faker.name.prefix() + ' ' + faker.name.firstName() + ' ' + faker.name.lastName();
		friends.push(randomFullName);
	}
}

app.get('/', function(req,res){
	res.render('home');
});

app.post('/addfriend', function(req,res){
	var newFriend = req.body.newfriend;
	friends.push(newFriend);
	res.redirect('/friends');
})

app.get('/friends', function(req,res){
	res.render('friends', {friends: friends});
});

app.listen(3000, function(){
	console.log('server is running!');
})