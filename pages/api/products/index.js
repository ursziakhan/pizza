// import mongooseConnect from '@/lib/mongoose';
// import { Product } from '@/models/Product';
// import fs from 'fs';
// import { createReadStream, mkdirSync, createWriteStream } from 'fs';
// import { join } from 'path';

// export default async function handle(req, res) {
//   const { method } = req;
//   await mongooseConnect();

//   if (method === 'GET') {
//     res.json(await Product.find());
//   }

//   if (method === 'POST') {
//     const { title, description, price } = req.body;
//     const file = req.files.image;
//     const UPLOAD_DIR = join(process.cwd(), 'uploads');
//     if (!fs.existsSync(UPLOAD_DIR)) {
//       mkdirSync(UPLOAD_DIR, { recursive: true });
//     }
//     const fileName = Date.now() + '_' + file.originalname;

//     // Write the uploaded file to the uploads directory
//     const filePath = join(UPLOAD_DIR, fileName);
//     const readStream = createReadStream(file.path);
//     const writeStream = createWriteStream(filePath);
//     readStream.pipe(writeStream);

//     const image = new Image({ filename: fileName, path: filePath });
//     await image.save();

//     const productDoc = await Product.create({
//       title,
//       description,
//       price,
//       image: [filePath],
//     });
//     res.json(productDoc);
//   }
// }

import mongooseConnect from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { NextApiRequest, NextApiResponse } from 'next';
import { createReadStream, mkdirSync, createWriteStream } from 'fs';
import { join } from 'path';
import fs from 'fs'; // add this line

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  if (method === 'GET') {
    if (req.query?.id) {
      const productId = req.query.id;
      try {
        const product = await Product.findOne({ _id: productId });
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
  }

  if (method === 'POST') {
    const { title, description, price } = req.body;
    const UPLOAD_DIR = join(process.cwd(), 'uploads');
    if (!fs.existsSync(UPLOAD_DIR)) {
      mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const file = req.files.image; // add this line
    const fileName = Date.now() + '_' + file.name;

    // Write the uploaded file to the uploads directory
    const filePath = join(UPLOAD_DIR, fileName);
    const readStream = createReadStream(file.tempFilePath);
    const writeStream = createWriteStream(filePath);
    readStream.pipe(writeStream);

    const productDoc = await Product.create({
      title,
      description,
      price,
      image: [filePath], // assuming you want to store the file path in the database
    });
    res.json(productDoc);
  }
}
