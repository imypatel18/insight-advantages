'use client';

import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

/***************************  MAIN CARD WRAPPER ***************************/

export default function MainCard({ children, sx = {}, ref, ...others }) {
  const theme = useTheme();

  const defaultSx = {
    p: { xs: 2, sm: 3 },
    borderRadius: 4,
    backgroundColor: 'background.paper',
    border: `1px solid ${theme.palette.divider}`,
    boxShadow: theme.customShadows?.z1 || '0px 2px 4px rgba(0,0,0,0.05)'
  };

  return (
    <Card
      ref={ref}
      elevation={0}
      sx={{
        ...defaultSx,
        ...(typeof sx === 'function' ? sx(theme) : sx)
      }}
      {...others}
    >
      {children}
    </Card>
  );
}

MainCard.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  ref: PropTypes.any
};
