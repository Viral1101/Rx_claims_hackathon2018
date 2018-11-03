var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/medicaid');
var Schema = mongoose.Schema;
var prescripSchema = new Schema({}, {"strict": false});
var User = mongoose.model('User', prescripSchema, 'prescriptions');
