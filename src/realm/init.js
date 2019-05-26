import Realm from 'realm'

const LectureHistorySchema = {
  name: 'LectureHistory',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    timestamp: 'date',
    professor: 'string'
  }
};

const realm = new Realm({schema: [LectureHistorySchema], schemaVersion: 3})

export default realm;
