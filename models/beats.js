module.exports = (sequelize, DataTypes) => {
  const Beats = sequelize.define('Beats', {
    title: {
        type: DataTypes.STRING,
        unique: 'compositeIndex',
        allowNull: false,
        validate: {
        notEmpty: true,
        },
    },
    description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
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
    // models.Choices.hasMany(models.Votes);
    models.Beats.belongsTo(models.Users);
  }

  return Beats;
};