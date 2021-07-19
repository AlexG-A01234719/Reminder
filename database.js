let Database = {
  cindy: {
    id: 1,
    name: "Cindy",
    email: "cindy@email.com",
    password: "cindypassword123",
    reminders: [
      { id: 1, title: "abc", description: "abcabc", completed: false },
    ],
  },
  alex: {
    id: 2,
    name: "Alex",
    email: "alex@email.com",
    password: "alexpassword123",
    reminders: [],
  },
};

const userModel = {
  findOne: (email) => {
    // Added this code ⭐️
    //const user = Database.find((user) => user.email === email);
    for (let user in Database) {
      if (Database[user].email == email) {
        return Database[user];
      }
    }
    return null;
  },
  findById: (id) => {
    // Added this code ⭐️
    // const user = Database.find((user) => user.id === id);
    for (let user in Database) {
      if (Database[user].id == id) {
        return Database[user];
      }
    }
    return null;
  },
};

module.exports = { Database, userModel };
