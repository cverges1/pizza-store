const { Schema, model } = require("mongoose");

const toppingSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    }
  },
);

// Pre-save hook to capitalize first letter of each word and convert the rest to lowercase
toppingSchema.pre('save', function(next) {
  if (this.name && this.isModified('name')) {
    // Split the name into words
    const words = this.name.split(' ');

    // Capitalize the first letter of each word and convert the rest to lowercase
    const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    // Join the words back together
    this.name = formattedWords.join(' ');
  }
  next();
});

const Topping = model('Topping', toppingSchema);

module.exports = Topping;
