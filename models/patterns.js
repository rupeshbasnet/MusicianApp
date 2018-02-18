'use strict'

module.exports = (sequelize, DataTypes) => {
  const Patterns = sequelize.define('Patterns', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    beatArray: {
            type: DataTypes.ARRAY(DataTypes.BOOLEAN),
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
  });

  Patterns.associate = (models) => {
    models.Patterns.belongsTo(models.User);
  }

  return Patterns;
};
