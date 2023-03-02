import MenuApp from './Menu';
import { Layout, BackTop, Image } from 'antd';
import styles from './styles/Layout.module.css';
import { useSelector } from 'react-redux';
import logo from '../images/logo.png';
import { selectAuthenticated } from '@/redux/authSelectors';
import Link from 'next/link';
import Router from 'next/router';
import { useEffect } from 'react';
const { Header, Content } = Layout;

const LayoutApp = ({ children }) => {
  const isAuthenticated = useSelector(selectAuthenticated);
  useEffect(() => {
    if ( !isAuthenticated ) {
      Router.push("/login");
    }
  }, [ isAuthenticated ]);
  return !isAuthenticated ? (
    <Layout className={styles.site}>
      <Content className={styles.background}>{children}</Content>
    </Layout>
  ) : (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Header className={styles.header}>
          <div className={styles.logo}>
            <Link href={'/'}>
              <Image src={logo} preview={false} />
            </Link>
          </div>
          <MenuApp theme="dark" />
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
      <BackTop />
    </Layout>
  );
};

export default LayoutApp;
