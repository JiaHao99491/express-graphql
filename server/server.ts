import express from 'express'
import {graphqlHTTP} from "express-graphql"
import cors from "cors"
import schema from "./schema"
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);
app.listen(4000, () => {
  console.log("服务器在4000端口上启动");
});