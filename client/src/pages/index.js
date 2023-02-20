import axios from 'axios';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import Router from 'next/router';
import { Row, Col, PageHeader, Button } from 'antd';
import ListItem from '../components/List';
import FormTerminal from '../components/Form';
import TableType from '../components/Table';
import LogoTable from '../components/LogoTable';
import TableConfig from '../components/TableConfig';

export default function Home() {
  useEffect(() => {
    const checkCookies = async () => {
      if(!Cookies.get('token') && localStorage.getItem('jwt')){
        return Router.push('/login')
      }
    };
    checkCookies();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common.Authorization
    return Router.push('/login');
  }

  return (
    <div>
      <PageHeader
        ghost={false}
        title="Home"
        extra={[
          <Button key="1" type="primary" onClick={() => handleLogout()}>
            Logout
          </Button>,
        ]}/>
      <Row>
          <Col span={3}><ListItem/></Col>
          <Col span={9}>
            <FormTerminal/>
            <TableType title={'Operation Type'} type={'OP'}/>
            <TableType title={'Carrier Type'} type={'CR'}/>
            <LogoTable/>
          </Col>
          <Col span={12}>
            <TableConfig/>
          </Col>
      </Row>
    </div>
  )
}
