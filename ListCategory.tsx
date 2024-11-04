import React, {useEffect, useState} from 'react'
import {  Divider, TabPaneProps, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

interface Category {
  category_id: string,
  name: string,
  description: string,
  created_at: Date,
  updated_at: Date,
  created_by: string,
  updated_by: string
}

const CategoryList = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        const data = await response.json();
        setCategories(data);
      }
      catch (error){
        console.error('Error fetch data:', error);
      }
    }
    fetchCategories();
  }, []);
  return <TableBase categories={categories} setCategories={setCategories}/>;
};

interface TableBaseProps {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const TableBase: React.FC<TableBaseProps> = ({categories, setCategories}) => {
  const navigate = useNavigate();

  const handleEdit = (categoryId:string) => {
    console.log(categoryId)
    navigate(`/category-edit/${categoryId}`);
  }
  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`http://localhost:5000/categories/${categoryId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Remove the deleted category from the state
          setCategories(categories.filter(category => category.category_id !== categoryId));
          message.success('Category deleted successfully');
        } else {
          message.error('Failed to delete category');
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        message.error('An error occurred while deleting the category');
      }
    }
  };

  const columns = [
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Thời gian tạo',
      dataIndex: 'created_at',
      key: 'created_at',
    },
    {
      title: 'Thời gian cập nhật',
      dataIndex: 'updated_at',
      key: 'updated_at',
    },
    {
      title: 'Người tạo',
      dataIndex: 'created_by',
      key: 'created_by',
    },
    {
      title: 'Người cập nhật',
      dataIndex: 'updated_by',
      key: 'updated_by',
    },
    {
      title: 'Sửa|Xóa',
      key: 'action',
      render: (categories : any) => (
        <span>
          <EditOutlined key="edit" onClick={() => handleEdit(categories.category_id)}/>
          <Divider type="vertical" />
          <DeleteOutlined key="delete" onClick={() => handleDelete(categories.category_id)}/>
        </span>
      ),
    },
  ];
  return <Table columns={columns} dataSource={categories} />
}

export default CategoryList