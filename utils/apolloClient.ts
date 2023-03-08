import { ApolloClient, from, HttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client/cache";
import { onError } from "@apollo/client/link/error";

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
  uri: "http://localhost:3000/api/graphql",
});

const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([errorLink, httpLink]),
});

export default apolloClient;
