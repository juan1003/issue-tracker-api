'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIssue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserIssue.belongsTo(models.User, {
        foreignKey: 'user_id'
      })
      
      UserIssue.belongsTo(models.Issue, {
        foreignKey: 'issue_id'
      })
      
      UserIssue.hasMany(models.UserIssueComment, {
        foreignKey: 'user_issue_id'
      })
      
    }
  };
  UserIssue.init({
    user_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserIssue',
  });
  return UserIssue;
};