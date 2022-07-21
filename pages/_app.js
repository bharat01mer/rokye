import "../styles/css/index.css"
import "swiper/css";
import { Provider } from "react-redux"
import { store } from "../redux"

function MyApp({ Component, pageProps }) {
  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>
}

export default MyApp
