import MenuApp from './Menu';
import { Layout, Image, FloatButton } from 'antd';
import styles from './styles/Layout.module.css';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
import { selectAuthenticated } from '@/redux/authSelectors';
const { Header, Content } = Layout;

const LayoutApp = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    if ( !isAuthenticated ) {
      Router.push("/login");
    }
  }, [ isAuthenticated ]);
  return ( !isAuthenticated ? 
    <Layout className={styles.site}>
      <Content className={styles.background}>{children}</Content>
    </Layout>
   : 
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}>
            <Link href={'/'}>
              <Image src={logo.src} alt={logo.src} preview={false} />
            </Link>
          </div>
          <MenuApp theme="dark" />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
      <FloatButton.BackTop visibilityHeight={400} />
    </Layout>
  );
};

export default LayoutApp;
