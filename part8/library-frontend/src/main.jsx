import React from 'react'
import ReactDOM from 'react-dom/client'
import App, { updateCache } from './App'

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  split
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'
import { getMainDefinition } from '@apollo/client/utilities'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/',    // your GraphQL HTTP endpoint
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('books-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

// this is pointing at “ws://localhost:4000/” — exactly where your WSServer is mounted
const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/'
  })
)

// split based on operation type
const splitLink = split(
  ({ query }) => {
    const def = getMainDefinition(query)
    return (
      def.kind === 'OperationDefinition' &&
      def.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
