module.exports = (sequelize, Sequelize) => {

  const Message = sequelize.define("messages", {
    username: {
      type: Sequelize.STRING
    },
    text: {
      type: Sequelize.STRING
    },
    messageSender: {
      type: Sequelize.STRING
    },
    messageReceiver: {
      type: Sequelize.STRING
    }
  });
  return Message;
};
