//Note model

//Set up mongoose
var mongoose = require("mongoose");
//Use mongoose's schema method
var Schema = mongoose.Schema;

//Create the noteSchema with the schema object
var noteSchema = new Schema({
    //The headline is the article associated with the note
    _headlineId: {
      type: Schema.Types.ObjectId,
      ref: "Headline"  
    },
    //date is just a string
    date: {
        type: Date,
        default: Date.now
    },
    // noteText also a string
    noteText: String
});

//Create the Note model using the noteSchema
var Note = mongoose.model("Note", noteSchema);

//Export the Note model
module.exports = Note;
