import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { name } = req.body;
    const filePath = path.join(process.cwd(), 'public', 'nombres.txt');

    // Añade el nombre al archivo
    fs.appendFile(filePath, `${name}\n`, (err) => {
      if (err) {
        res.status(500).json({ message: 'Error writing to file' });
      } else {
        res.status(200).json({ message: 'Name saved successfully' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
