var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  summary: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: true
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
