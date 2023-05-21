import { Schema, models, model } from 'mongoose';

const ImageSchema = new Schema({
  filename: String,
  path: String,
  created_at: { type: Date, default: Date.now },
});

// Define the product schema
const ProductSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    // image: [ImageSchema], // an array of image URLs
  },
  {
    timestamps: true, // add timestamps for createdAt and updatedAt fields
  }
);

// Define the Product model using the schema
export const Product = models.Product || model('Product', ProductSchema);
