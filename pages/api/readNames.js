import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const filePath = path.join('.', 'public', 'nombres.txt');

  // Lee el archivo y devuelve la lista de nombres
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ message: 'Error reading file' });
    } else {
      const names = data.trim().split('\n');
      res.status(200).json({ names });
    }
  });
}
