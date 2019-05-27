import Realm from 'realm'

const LectureHistorySchema = {
  name: 'LectureHistory',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    speaker: 'string',
    expire: 'string',
  }
};

const realm = new Realm({schema: [LectureHistorySchema], schemaVersion: 6})

export default realm;
