import React, { useRef, useState } from 'react'
import { Form, Input, Row, Col, Select } from 'antd';
import { GithubPicker } from 'react-color';

const { Option } = Select;

const egOption = [
    {
      key:   1,
      value: 'terminal',
      name:  'Terminal Investment Limit'
    },
    {
      key:   2,
      value: 'eg',
      name:  'Example'
    },
  ];

const timeZone = [
    {
        key: 1,
        value: 'HCM',
        name: 'Asia/Ho Chi Minh'
    },
    {
        key: 2,
        value: 'Kr',
        name: 'Asia/Seoul'
    }
];

const colors = [
    '#B80000',
    '#DB3E00',
    '#FCCB00',
    '#008B02',
    '#006B76',
    '#1273DE',
    '#004DCF',
    '#5300EB',
    '#EB9694',
    '#FAD0C3',
    '#FEF3BD',
    '#C1E1C5',
    '#BEDADC',
    '#C4DEF6',
    '#BED3F3',
    '#D4C4FB',
    '#4D4D4D',
    '#999999',
    '#FFFFFF',
    '#F44E3B',
    '#FE9200',
    '#FCDC00',
    '#DBDF00',
    '#A4DD00',
    '#68CCCA',
    '#73D8FF',
    '#AEA1FF',
    '#FDA1FF',
    '#333333',
    '#808080',
    '#cccccc',
    '#D33115',
    '#E27300',
    '#FCC400',
    '#B0BC00',
    '#68BC00',
    '#16A5A5',
    '#009CE0',
    '#7B64FF',
    '#FA28FF',
    '#666666',
    '#B3B3B3',
    '#9F0500',
    '#C45100',
    '#FB9E00',
    '#808900',
    '#194D33',
    '#0C797D',
    '#0062B1',
    '#653294'
  ];

const FormTerminal = () => {
    const [form] = Form.useForm();
    const [ isOpen, setIsOpen ] = useState(false);
    const inputRef = useRef(null);

    const getValueColor = (fields) => {
        let data = form.getFieldValue(fields);
        form.setFieldValue('customColr', data);
        form.setFieldValue('backClr', data);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
    };
    return (
        <Form form={form}
            size='small'
          name='register'
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item
                        label='Code'
                        name='Code'
                        colon={false}
                        className='px-3'
                    >
                        <span className='bg-[#ff0000] px-5 py-0.5 rounded-[4px] text-white'>LCHA1</span>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Local Port'
                        name='localPort'
                        colon={false}
                    >
                        <span className='bg-[#CE8CEE] px-5 py-0.5 rounded-[4px] text-bold'>THLCH</span>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Name'
                        name='name'
                        rules={[
                        {
                            required: true,
                            message: 'Please input name!',
                        },
                        ]}
                        colon={false}
                    >
                        <Input placeholder='Name Terminal' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Type'
                        name='type'
                        colon={false}
                    >
                        <span className='bg-[#5BE6EE] px-11 py-0.5 rounded-[4px] text-bold'>Port</span>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Display Name'
                        name='displayName'
                        colon={false}
                        rules={[
                        {
                            required: true,
                            message: 'Please input display name!',
                        },
                        ]}
                    >
                        <Input placeholder='Display Name' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Company'
                        name='companyShort'
                        colon={false}
                        className='px-2'
                    >
                        <Input placeholder='Company' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='company'
                        colon={false}
                    >
                        <Input placeholder='Company' />
                    </Form.Item>
                </Col>
                <Col span={14}>
                    <Form.Item
                        label='Global TML OPR'
                        name='companyCbx'
                        colon={false}
                        className='px-2'
                    >
                        <Select
                    style={{
                        minWidth:  180,
                        textAlign: 'center',
                        fontSize:  15
                    }}
                    >

                    {
                        egOption.map((option) => (
                        <Option value={option.value} key={option.key}>{option.name}</Option>
                        ))
                    }

                    </Select>
                    </Form.Item>
                </Col>
                <Col span={10}>
                    <Form.Item
                        name='companySelect'
                        colon={false}
                    >
                        <Select
                    style={{
                        minWidth:  180,
                        textAlign: 'center',
                        fontSize:  15
                    }}
                    className='pl-3'
                    >

                    {
                        egOption.map((option) => (
                        <Option value={option.value} key={option.key}>{option.name}</Option>
                        ))
                    }

                    </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Time Zone'
                        name='timeZone'
                        colon={false}
                        className='px-2'
                    >
                        <Select
                    style={{
                        minWidth:  180,
                        textAlign: 'center',
                        fontSize:  15
                    }}
                    className='pl-3 ml-2'
                    >
                    {
                        timeZone.map((option) => (
                        <Option value={option.value} key={option.key}>{option.name}</Option>
                        ))
                    }
                    </Select>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Address'
                        name='address'
                        colon={false}
                        className='px-2 mb-2'
                    >
                        <Input className='ml-2' placeholder='Address' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        name='postCd'
                        colon={false}
                        className='px-2 pl-[67px]'
                    >
                        <Input className='ml-2' placeholder='Postal code' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Latidude'
                        name='latidude'
                        colon={false}
                        className='px-2'
                    >
                        <Input placeholder='Latitude' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Longtitude'
                        name='longtitude'
                        colon={false}
                    >
                        <Input placeholder='Longtitude' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Tel.'
                        name='phone'
                        colon={false}
                        className='px-2'
                    >
                        <Input placeholder='Telephone' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Fax'
                        name='fax'
                        colon={false}
                    >
                        <Input placeholder='Fax' />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item
                        label='Email'
                        name='email'
                        colon={false}
                        className='px-2'
                    >
                        <Input className='ml-2' placeholder='Email' />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <div style={{ width: '100%' }}>
                        <Form.Item label='Back Color' name='backClr' colon={false} className='px-2'>
                            <Input
                                placeholder='Select color'
                                onClick={() => setIsOpen(!isOpen)}
                                style={{
                                    width: '100%'
                                }}
                                readOnly={true}
                                ref={inputRef}
                            >
                            </Input>
                        </Form.Item>
                        <div hidden={isOpen ? false : true}>
                            <Form.Item name="colrPicker">
                                <Row style={{ margin: '5px 0 0 0' }}>
                                    <GithubPicker
                                        width={'100%'}
                                        colors={colors}
                                        onChange={(color) => {
                                            form.setFieldValue('colrPicker',color.hex);
                                            getValueColor('colrPicker'); }}
                                    >
                                    </GithubPicker>
                                </Row>
                            </Form.Item>
                            <Form.Item name="customColr" >
                                <Input
                                    placeholder='Assign custom color like #FF0000'
                                    ref={inputRef}
                                    style={{
                                        width: '100%'
                                    }}
                                    onChange={(event) => {
                                        form.setFieldValue('customColr',event.target.value);
                                        getValueColor('customColr'); }}
                                >
                                </Input>
                            </Form.Item>
                        </div>
                    </div >
                </Col>
                <Col span={12}>
                    <Form.Item
                        label='Font Color'
                        name='fontClr'
                        colon={false}
                        className='px-1'
                    >
                        <Input placeholder='Fax' />
                    </Form.Item>
                </Col>
            </Row>
        </Form>
      );
};    
export default FormTerminal;