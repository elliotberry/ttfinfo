
const TABLE_COUNT_OFFSET = 4;
const TABLE_HEAD_OFFSET = 12;
const TABLE_HEAD_SIZE = 16;
const TAG_OFFSET = 0;
const TAG_SIZE = 4;
const CHECKSUM_OFFSET = TAG_OFFSET + TAG_SIZE;
const CHECKSUM_SIZE = 4;
const CONTENTS_PTR_OFFSET = CHECKSUM_OFFSET + CHECKSUM_SIZE;
const CONTENTS_PTR_SIZE = 4;
const LENGTH_OFFSET = TABLE_HEAD_SIZE + CONTENTS_PTR_OFFSET;

export function count(data) {
  return data.readUInt16BE(TABLE_COUNT_OFFSET);
}

export function offset(data, name) {
  return exports.tableHead(data, name).contents;
}

export function tableHead(data, name) {
  const numTables = exports.count(data);

  for (let i = 0; i < numTables; ++i) {
    const o = TABLE_HEAD_OFFSET + i * TABLE_HEAD_SIZE;
    const tag = data.slice(o, o + CONTENTS_PTR_SIZE).toString();

    if (tag === name) {
      return {
        tag,
        checksum: data.readUInt32BE(o + CHECKSUM_OFFSET),
        contents: data.readUInt32BE(o + CONTENTS_PTR_OFFSET),
        length: data.readUInt32BE(o + LENGTH_OFFSET)
      };
    }
  }
}

