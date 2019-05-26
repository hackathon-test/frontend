import Realm from 'realm'

const LectureHistorySchema = {
  name: 'LectureHistory',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    timestamp: 'date',
  }
};

const realm = new Realm({schema: [LectureHistorySchema], schemaVersion: 2})

export default realm;
