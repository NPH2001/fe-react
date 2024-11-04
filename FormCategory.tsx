import React, { useState } from 'react';
import { Form, Input, Space, Button} from 'antd';


type SizeType = Parameters<typeof Form>[0]['size'];
const { TextArea } = Input;
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

interface Category {
    category_id: string,
    name: string,
    description: string,
    created_at: Date,
    updated_at: Date,
    created_by: string,
    updated_by: string
}

const FormCategory: React.FC = () => {
  const [componentSize, setComponentSize] = useState<SizeType | 'default'>('default');
  const [form] = Form.useForm();

  const onFormLayoutChange = ({ size }: { size: SizeType }) => {
    setComponentSize(size);
  };
  const onReset = () => {
    form.resetFields();
  };
  const onFill = () => {
    form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
  };

  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
      size={componentSize as SizeType}
      style={{ maxWidth: 600 }}
    >
      <Form.Item label="Tên">
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả">
        <TextArea rows={5} />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Space>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          <Button htmlType="button" onClick={onReset}>
            Reset
          </Button>
          <Button type="link" htmlType="button" onClick={onFill}>
            Fill form
          </Button>
        </Space>
      </Form.Item>

    </Form>
  );
};

export default FormCategory;