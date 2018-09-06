import React from 'react';
import AddEdit from './add_edit_book';
import '../admin.css';

/**
 * Main add book component
 */
const AddMain = () => (
  <div className="container">
    {/* Call add book fomr component */}
    <AddEdit path="/api/v1/books" method="POST" />
  </div>
);

export default AddMain;
