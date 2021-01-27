module.exports = (sequelize, Sequelize) => {
 const Message = sequelize.define("messages", {
      userId: {
        type: Sequelize.STRING
      },
      content: {
        type: Sequelize.STRING
      }
    });
      return Message;
};