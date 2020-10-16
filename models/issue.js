'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Issue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Issue.hasOne(models.UserIssue, {
        foreignKey: 'issue_id'
      })

      Issue.hasMany(models.UserIssueComment, {
        foreignKey: 'issue_id'
      })
    }
  };
  Issue.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Issue',
  });
  return Issue;
};