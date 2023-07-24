import multiparty from 'multiparty';
import mongooseConnect from '@/lib/mongoose';

export default async function handler(req, res) {
  await mongooseConnect();
  const form = new multiparty.Form();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ message: 'Error parsing form data' });
      return;
    }

    // Access the uploaded file
    const file = files.files[0];
    if (!file) {
      res.status(400).json({ message: 'Invalid file' });
      return;
    }

    // Handle the file as needed (e.g., save it, process it, etc.)

    res.status(200).json({ message: 'ok' });
  });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
