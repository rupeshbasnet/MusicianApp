'use strict';

const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
  });

  User.associate = (models) => {
    models.User.hasMany(models.Beats);
    models.User.hasMany(models.Patterns);
  }

  User.beforeCreate((user) =>
    new sequelize.Promise((resolve) => {
      bcrypt.hash(user.password, null, null, (err, hashedPassword) => {
        console.log("hashed PW --------", hashedPassword);
        resolve(hashedPassword);
      });
    }).then((hashedPassword) => {
      user.password_hash = hashedPassword;
    })
  );

  return User;
};
