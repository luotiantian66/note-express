var path = require('path')

const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined, undefined, undefined, {
  host: 'localhost',
  dialect: 'sqlite',
  storage: path.join(__dirname, '../database/database.sqlite')
});


// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

const Note = sequelize.define('user', {
  level:Sequelize.BIGINT, 
  text:Sequelize.STRING,
  uid:Sequelize.STRING
});

// Note.sync({force:true})
// Note.sync().then(() => {
//   // Table created
//   return Note.create({level:2,text: '这是一个便利贴'});
// }).then(() => {
//   Note.findAll({raw:true}).then((notes) => {
//     console.log(notes)
//   })
// })


// Note.findAll({raw:true,where:{id:2}}).then((notes) => {
//   console.log(notes)
// })

module.exports = Note;
