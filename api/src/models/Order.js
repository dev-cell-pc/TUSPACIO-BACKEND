const { DataTypes } = require('sequelize');
const {User} = require('./User')
module.exports = (sequelize) => {
  sequelize.define('order', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
        allowNull: false,
        defaultValue: 'created',
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    // products_id: { 
    //   type: DataTypes.ARRAY(DataTypes.UUID),
    //   // allowNull: false,
    // },
  });
};
