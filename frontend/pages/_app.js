import '../styles/globals.css'
import { StoreProvider } from './utils/Store'
import { useRouter } from 'next/router'
import Head from "next/head";


function MyApp({ Component, pageProps }) {
  return(
    <>
              <StoreProvider>
                        <Component {...pageProps} />
              </StoreProvider>
    </>
  )
}

export default MyApp
