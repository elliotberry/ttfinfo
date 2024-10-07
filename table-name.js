
import table from './table';

export default function(data) {
  const ntOffset = table.offset(data, 'name');
  const offsetStorage = data.readUInt16BE(ntOffset+4);
  const numberNameRecords = data.readUInt16BE(ntOffset+2);

  const storage = offsetStorage + ntOffset;

  const info = {};
  for (let j = 0; j < numberNameRecords; j++) {
    const o = ntOffset + 6 + j*12;

    const platformId = data.readUInt16BE(o);
    const nameId = data.readUInt16BE(o+6);
    const stringLength = data.readUInt16BE(o+8);
    const stringOffset = data.readUInt16BE(o+10);

    if (!info[nameId]) {
      info[nameId] = '';

      for (let k = 0; k < stringLength; k++) {
        const charCode = data[storage+stringOffset+k];
        if (charCode === 0) continue;
        info[nameId] += String.fromCharCode(charCode);
      }
    }
  }

  return info;
};

