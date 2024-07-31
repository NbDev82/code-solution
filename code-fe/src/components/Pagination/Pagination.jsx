import { memo } from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { LIMIT_ROW_PROBLEMS_TABLE } from '~/utils/Const';
import './Pagination.scss';
function Pagination(props) {
  return (
    <ReactPaginate
      pageCount={Math.ceil(props.totalRows / props.limit)}
      pageRangeDisplayed={5}
      onPageChange={props.onPageChange}
      previousLabel={<ArrowBackIosIcon sx={{ fontSize: 18 }} />}
      nextLabel={<ArrowForwardIosIcon sx={{ fontSize: 18 }} />}
      breakLabel="..."
      marginPagesDisplayed={2}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      containerClassName={'pagination'}
      activeClassName={'active'}
    />
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func,
  totalRows: PropTypes.number,
  limit: PropTypes.number,
};
Pagination.defaultProps = {
  totalRows: 1,
  limit: LIMIT_ROW_PROBLEMS_TABLE,
};

export default memo(Pagination);
