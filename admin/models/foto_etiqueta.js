'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class foto_etiqueta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  foto_etiqueta.init({
    foto_id: DataTypes.INTEGER,
    etiqueta_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'foto_etiqueta',
    tableName: 'foto_etiquetas'
  });
  return foto_etiqueta;
};