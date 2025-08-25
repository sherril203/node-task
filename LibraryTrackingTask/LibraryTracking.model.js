const mongoose = require('mongoose');

const LibraryTrackingSchema = new mongoose.Schema({
  Book_name: { type: String ,required:true,unique: true},
  Author_name: { type: String ,required:true,unique: true},
  Issue_date: { type: Date,required:true ,unique: true},
  Due_date: { type: Date ,required:true},
  Return_date: { type: Date,required:true ,unique: true},
  Borrower_name: { type: String },
  Borrower_id: { type: Number,required:true,unique: true }
});
// LibraryTrackingSchema.index(
//   { Book_name: 1, Borrower_id: 1, Issue_date: 1 },
//   {unique: true  }
// );

const LibraryTrackingModel = mongoose.model('LibraryTracking', LibraryTrackingSchema);

module.exports = LibraryTrackingModel;
