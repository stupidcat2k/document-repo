import { SPACE_LIST } from '@/utils/LayoutList';
import { Layout, Menu } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import Sider from 'antd/lib/layout/Sider';
import styles from './styles/SpaceLayout.module.css';

const SpaceLayout = ({ children }) => {
  return (
    <Layout style={{ background: '#fff', minHeight: '93vh' }}>
    <Sider breakpoint='lg' style={{ background :'#f0f0f0', position: 'absolute', height:'93vh'}}>
      <Menu
          theme="light"
          mode="inline"
          id='space'
          defaultSelectedKeys={'space'}
          items={SPACE_LIST}
        />
    </Sider>
      <Layout className={styles.site}>
        <Content
          className={styles.background}
          style={{
            marginLeft:     '11vw',
            paddingTop: 8,
            minHeight:  280,
          }}
        >
          {children}
        </Content>
      </Layout>
  </Layout>
  );
};

export default SpaceLayout;
