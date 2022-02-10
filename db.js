const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://moqadar:root@cluster0.j9mgd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(success => {
  console.log('Success Mongodb connection')
}).catch(err => {
  console.log('Error Mongodb connection')
});
