'use strict'

module.exports = (sequelize, DataTypes) => {
  const Beats = sequelize.define('Beats', {
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

  Beats.associate = (models) => {

    models.Beats.belongsTo(models.User);
  }

  return Beats;
};
