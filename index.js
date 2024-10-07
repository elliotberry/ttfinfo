import fs from 'node:fs/promises';
import nameTable from './table-name.js';
import postTable from './table-post.js';
import os2Table from './table-OS2.js';

function ttfInfo(data) {
  return {
    tables: {
      name: nameTable(data),
      post: postTable(data),
      'OS/2': os2Table(data)
    }
  };
}

export default async (pathOrData) => {
  if (!(pathOrData instanceof Buffer) && typeof pathOrData !== 'string') {
    throw new Error('Invalid path or data provided.');
  }

  try {
    const data = pathOrData instanceof Buffer ? pathOrData : await fs.readFile(pathOrData);
    return ttfInfo(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error(`${pathOrData} not found.`);
    } else {
      throw new Error(`Error reading ttf: ${err.message}`);
    }
  }
};
