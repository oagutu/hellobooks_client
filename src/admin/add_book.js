import React from 'react';
import AddEdit from './add_edit_book';
import './admin.css';

const AddMain = () => (
  <div className="container">
    <AddEdit path="/api/v1/books" method="POST" />
  </div>
);

export default AddMain;
