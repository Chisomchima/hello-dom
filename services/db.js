import Dexie from 'dexie';

const db = new Dexie('slate-offline');
db.version(2).stores({
    formData: 'id,data,page,params', // Primary key and indexed props
    syncedLessonContent: 'id++,school,subject,lesson', // 
});

export default db;