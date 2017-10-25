module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    UserName: DataTypes.STRING
  });

  Users.associate = (models) => {
    models.Users.hasMany(models.Beats);
  }

  return Users;
};

