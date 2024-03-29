module.exports = mongoose => {
    const schema = mongoose.Schema({
          title: String,
          description: String,
          published: Boolean
        },
        { timestamps: true }
      );

    //   Cara ganti _id menjadi id
      schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
    
      const Book = mongoose.model("book", schema);
      return Book;
  };