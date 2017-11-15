const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    password: DataTypes.STRING /* change DataTypes to VIRTUAL later on */
  });

  Users.associate = (models) => {
    models.Users.hasMany(models.Beats);
  }

  Users.beforeCreate((user) => {
    user.email = user.email && user.email.toLowerCase();
    if (!user.password) return Promise.resolve(user);

    return bcrypt.hash(user.get('password'), 10)
    .then(hash => {
      user.set('password_hashed', hash)
    })
  });

  Users.prototype.authenticate = (password, hashed_pw) => {
    return bcrypt.compareSync(password, hashed_pw);
  }


  return Users;
};
function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase()
  if (!user.password) return Promise.resolve(user)

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => {
      user.set('password_hashed', hash)
    })
}
