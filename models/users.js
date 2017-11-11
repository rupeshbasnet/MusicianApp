const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password: DataTypes.STRING /* change DataTypes to VIRTUAL later on */
  });

  Users.associate = (models) => {
    models.Users.hasMany(models.Beats);
  }

  Users.beforeCreate((user) =>
    new sequelize.Promise((resolve) => {
      bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
        console.log("--------password--------" + user.password);
        resolve(hashedPassword);
      });
    }).then((hashedPw) => {
      user.password_hash = hashedPw;
    })
  );


  return Users;
};
