import Realm from 'realm'

const LectureHistorySchema = {
  name: 'LectureHistory',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
  }
};

const realm = new Realm({schema: [LectureHistorySchema], schemaVersion: 1})

export default realm;
