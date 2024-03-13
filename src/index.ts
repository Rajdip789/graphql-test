import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

const PORT: Number = Number(process.env.PORT) || 8002;

async function init() {
	const app = express();

	app.use(express.json());

	app.get("/", (req, res) => {
		res.json({ message: "Server is up and running" });
	});

	const gqlServer = await createApolloGraphqlServer();
	app.use("/graphql", expressMiddleware(gqlServer));

	app.listen(PORT, () => {
		console.log(`Server listening on port: ${PORT}`);
	});
}

init();
