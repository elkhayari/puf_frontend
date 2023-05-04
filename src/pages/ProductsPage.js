import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
//import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
//import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  return (
    <>
      <div>
        <title> Dashboard: Products | Minimal UI </title>
      </div>
      <p> p list</p>
    </>
  );
}
