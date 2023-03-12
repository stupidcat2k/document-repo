import React, { useState, useEffect } from "react";
import { Input, Row, Col, Divider, Form, Checkbox } from "antd";

export default function SearchPanel(props) {
  const [keyWorld, setKeyWord] = useState("");
  const [active, setActive] = useState(true);
  const sendData = () => {
    let obj = {
      keyWord: keyWorld,
      active: active,
    };
    props.parentCallback(obj);
  };

  useEffect(() => {
    sendData();
  }, [keyWorld, active]);

  return (
    <>
      <Row justify="center">
        <Col span={24}>
          <Divider orientation="left">User List</Divider>
          <Form
            name="UserForm"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 15,
            }}
            scrollToFirstError
            initialValues={{
              active: true,
            }}
          >
            <Row>
              <Col xs={24} sm={24} md={12}>
                <Form.Item label="User Name" name="usrNm">
                  <Input onChange={(e) => setKeyWord(e.target.value)} />
                </Form.Item>
              </Col>
              <Col sm={24} md={6}>
                <Form.Item name="active" valuePropName="checked">
                  <Checkbox
                    checked={true}
                    onClick={(e) => {
                      setActive(e.target.checked);
                    }}
                  >
                    Active
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Divider
              style={{
                margin: "10px 0",
              }}
            />
          </Form>
        </Col>
      </Row>
    </>
  );
}
