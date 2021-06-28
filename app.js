const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const graphql = require('graphql');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const PORT = 5000;

const app = express();

const mongo = require('mongoose');

mongo
  .connect(`mongodb://localhost:27017/test`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

const { userQuery } = require('./src/mutation/userQuery');
const { userMutation } = require('./src/mutation/userMutation');

const schema = new graphql.GraphQLSchema({
  query: userQuery,
  mutation: userMutation,
});

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT, () => {
  console.log(`Server running succefully on port ${PORT}`);
});
