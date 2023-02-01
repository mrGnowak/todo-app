import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row } from 'antd';
import { Todo } from './types';

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';

type Props = {
  onRemove: (todoId: number) => void;
  item: Todo;
};

export default function TodoItem({ item, onRemove }: Props) {
  return (
    <>
      <div style={{ marginTop: '2px', marginBottom: '2px' }}>
        <Row wrap={false}>
          <Col flex="auto">
            <div>{item.title}</div>
          </Col>
          <Col flex="50px">
            <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
              <EditOutlined />
            </Button>
          </Col>
          <Col flex="50px">
            <Popconfirm
              placement="bottomLeft"
              title={text}
              description={description}
              onConfirm={() => onRemove(item.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
      </div>
    </>
  );
}
