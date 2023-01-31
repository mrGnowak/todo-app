import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row } from 'antd';
import { ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

export default function TodoItem({ title, id }: { title: string; id: number }) {
  const text = 'Are you sure to delete this task?';
  const description = 'Delete the task';

  return (
    <>
      <div style={{ marginTop: '2px', marginBottom: '2px' }}>
        <Row wrap={false}>
          <Col flex="auto">
            <div>{title}</div>
          </Col>
          <Col flex="50px">
            <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
              <EditOutlined />
            </Button>
          </Col>
          <Col flex="50px">
            {
              <Popconfirm
                placement="bottomLeft"
                title={text}
                description={description}
                //onConfirm={} ----------- funcja remove
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
                  <DeleteOutlined />
                </Button>
              </Popconfirm>
            }
          </Col>
        </Row>
      </div>
    </>
  );
}
