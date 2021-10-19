import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'
import Header from '../components/Header'

import client from '../graphql/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="bg-blue-200">
        <Header />

        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  )
}
export default MyApp
