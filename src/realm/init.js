import Realm from 'realm'

const LectureHistorySchema = {
  name: 'LectureHistory',
  primaryKey: 'id',
  properties: {
    id: 'string',
    title: 'string',
    speaker: 'string',
    expireDate: 'string',
  }
};

const realm = new Realm({schema: [LectureHistorySchema], schemaVersion: 5})

export default realm;
