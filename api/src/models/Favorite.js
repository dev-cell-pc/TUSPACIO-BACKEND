const { DataTypes } = require('sequelize')
module.exports = (sequelize) => {
  sequelize.define(
    "favorite",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      idProduct: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      idUser: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
  
};
