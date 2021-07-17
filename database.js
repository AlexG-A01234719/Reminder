let Database = {
    cindy: {
        id: 1,
        name: "Cindy",
        email: "cindy@email.com",
        password: "cindypassword123",
        reminders: [{id: 1, title: "abc", description: "abcabc", completed: false}]
    },
    alex: {
        id: 2,
        name: "Alex",
        email: "alex@email.com",
        password: "alexpassword123",
        reminders: []
    } 
}

const userModel = {
    findOne: (email) => {
      const user = database.find((user) => user.email === email);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with email: ${email}`);
    },
    findById: (id) => {
      const user = database.find((user) => user.id === id);
      if (user) {
        return user;
      }
      throw new Error(`Couldn't find user with id: ${id}`);
    },
  };
  


  module.exports = { Database, userModel };