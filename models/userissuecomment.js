'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserIssueComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserIssueComment.belongsTo(models.User, {
        foreignKey: 'user_id'
      })

      UserIssueComment.belongsTo(models.Issue, {
        foreignKey: 'issue_id'
      })

      UserIssueComment.belongsTo(models.UserIssue, {
        foreignKey: 'user_issue_id'
      })

      UserIssueComment.belongsTo(models.Comment, {
        foreignKey: 'comment_id'
      })
    }
  };
  UserIssueComment.init({
    user_id: DataTypes.INTEGER,
    issue_id: DataTypes.INTEGER,
    user_issue_id: DataTypes.INTEGER,
    comment_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserIssueComment',
  });
  return UserIssueComment;
};