import { LayoutApp } from '@/components'
import LoadingContextProvider from '@/contexts/LoadingContext'
import NotificationContextProvider from '@/contexts/NotificationContext'
import { loadAuthentication } from '@/redux/authAction'
import store from '@/redux/store'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Provider, useDispatch } from 'react-redux'
import '../styles/globals.css'

const AppWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    if (router.pathname !== '/login') {
      dispatch(loadAuthentication()).then(() => {
        setAuthLoaded(true);
      });
    } else {
      setAuthLoaded(true);
    }
  }, [dispatch, router.pathname]);

  if (!authLoaded) {
    return null;
  }

  return children;
};

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NotificationContextProvider>
        <LoadingContextProvider>
          <AppWrapper>
            <LayoutApp>
              <Component {...pageProps} />
            </LayoutApp>
          </AppWrapper>
        </LoadingContextProvider>
      </NotificationContextProvider>
    </Provider>
  );
}

export default App;