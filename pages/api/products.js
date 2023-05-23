import mongooseConnect from '@/lib/mongoose';
import { Product } from '@/models/Product';

import { ObjectId } from 'mongodb';

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  /*  if (method === 'GET') {
    console.log(req.query?.id);
    if (req.query?.id) {
      const productId = req.query.id;
      try {
        const product = await Product.findOne({
          _id: ObjectId(productId),
        });
        if (product) {
          res.json(product);
        } else {
          res.status(404).json({ error: 'Product not found' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
      }
    } else {
      res.json(await Product.find());
    }
  } */
  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === 'POST') {
    const { title, description, price } = req.body;

    const productDoc = await Product.create({
      title,
      description,
      price,
      //   image: [filePath],
    });
    res.json(productDoc);
  }
}
