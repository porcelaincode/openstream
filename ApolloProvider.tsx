// apollo
import {
	ApolloClient,
	InMemoryCache,
	createHttpLink,
	split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { BASE_URI } from "./constants/Urls";

// secure store import
import * as SecureStore from "expo-secure-store";

const URI = `https://${BASE_URI}`;

// websocket link
const wsLink = new WebSocketLink({
	uri: `wss://${BASE_URI}/subscriptions`,
	options: {
		reconnect: true,
	},
});

// http link
const httpLink = createHttpLink({
	uri: URI,
});

const authLink = setContext(async () => {
	const token = await SecureStore.getItemAsync("jwtToken");
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : "",
		},
	};
});

const link = split(
	({ query }) => {
		const definition = getMainDefinition(query);
		return (
			definition.kind === "OperationDefinition" &&
			definition.operation === "subscription"
		);
	},
	wsLink,
	authLink.concat(httpLink)
);

export const client = new ApolloClient({
	link,
	cache: new InMemoryCache({
		addTypename: false,
	}),
});
