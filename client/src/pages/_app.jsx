import { Layout } from 'antd'
import '../styles/globals.css'
import '../styles/LoginForm.css'
import '../styles/main.css'

export default function App({ Component, pageProps }) {
  return (    
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}
