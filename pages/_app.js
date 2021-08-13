import '../styles/globals.css'
import HeaderHome from "../components/headerHome";

function MyApp({ Component, pageProps }) {
  return (<>
    <HeaderHome/>
    <Component {...pageProps} />
    </>)
}

export default MyApp
