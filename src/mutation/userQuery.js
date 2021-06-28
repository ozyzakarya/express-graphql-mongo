const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLString,
} = require('graphql');
const User = require('../model/User');
const userType = require('../schema/userSchema');

const userQuery = new GraphQLObjectType({
  name: 'userQuery',
  fields: () => {
    return {
      users: {
        type: new GraphQLList(userType),
        resolve: async (parent, args) => {
          const users = await User.find({});
          return users;
        },
      },
      user: {
        type: userType,
        args: {
          id: { type: GraphQLID },
        },
        resolve: async (parent, args) => {
          const user = await User.findById(args.id);
          return user;
        },
      },
    };
  },
});
module.exports = {
  userQuery,
};
