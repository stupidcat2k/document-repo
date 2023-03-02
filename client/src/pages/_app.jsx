import LayoutApp from '@/components/Layout'
import LoadingContextProvider from '@/contexts/LoadingContext'
import NotificationContextProvider from '@/contexts/NotificationContext'
import { loadAuthentication } from '@/redux/authAction'
import store from '@/redux/store'
import { Provider } from 'react-redux'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return ( 
      <Provider store={store}>
        <NotificationContextProvider>
          <LoadingContextProvider>
            <LayoutApp>
              <Component {...pageProps} />
            </LayoutApp>
          </LoadingContextProvider>
        </NotificationContextProvider>
      </Provider>
 );
}
