import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Input, Modal, Popconfirm, Row } from 'antd';
import { useState } from 'react';
import { Todo } from './types';

const text = 'Are you sure to delete this task?';
const description = 'Delete the task';

type Props = {
  onRemove: (todoId: number) => void;
  onUpdate: (todoId: number, title: string, itemColumnName: string, nextId: number) => void;
  item: Todo;
  index: number;
};

export default function TodoItem({ item, onRemove, onUpdate, index }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>('');
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setEditedTitle(e.currentTarget.value);
  return (
    <>
      <div style={{ marginTop: '2px', marginBottom: '2px' }}>
        <Row wrap={false}>
          <Col flex="auto">
            <div>{item.title}</div>
          </Col>
          <Col flex="50px">
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: 'rgb(120, 120, 120)' }}
            >
              <EditOutlined />
            </Button>
            <Modal
              title="Change task description: "
              open={isModalOpen}
              onOk={() => {
                setIsModalOpen(false);
                onUpdate(item.id, editedTitle, item.columnName, item.nextId);
              }}
              onCancel={() => setIsModalOpen(false)}
            >
              <Input
                type="text"
                name="name"
                onPressEnter={() => {
                  setIsModalOpen(false);
                  onUpdate(item.id, editedTitle, item.columnName, item.nextId);
                }}
                onChange={onChange}
              />
            </Modal>
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
