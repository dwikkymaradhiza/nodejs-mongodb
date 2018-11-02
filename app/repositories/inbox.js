const { Inbox } = require('./../../configs/db');

const inboxRepository = {
  createInbox: async (data) => {
    try {
      const result = await Inbox.create(data);

      return result;
    } catch (e) {
      console.error(`[InboxRepositoryError | createInbox] ${JSON.stringify(e, null, 2)}`);
      throw e;
    }
  },

  getAllInbox: async () => {
    try {
      const result = await Inbox.find({});

      return result;
    } catch (e) {
      console.error(`[InboxRepositoryError | getAllInbox] ${JSON.stringify(e, null, 2)}`);
      throw e;
    }
  }
};

module.exports = inboxRepository;