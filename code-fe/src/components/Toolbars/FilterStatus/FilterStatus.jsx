import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { HStack } from '@chakra-ui/react';
import {SmallCloseIcon} from '@chakra-ui/icons'
import { FILTER_DEFAULT } from '~/utils/Const';
import styles from './FilterStatus.module.scss';

const FilterStatus = (props) => {
  const { status, difficulty, topic, searchTerm } = props.filters;
  const statusFilters = [status, difficulty, topic, searchTerm].filter((i) => i !== 'all' &&  i !== 'ALL' && i !== '');
  console.log(statusFilters);
  return statusFilters.length !== 0 ? (
    <HStack className={styles.container}>
      {statusFilters.map((status, index) => (
        <div className={styles.item} key={index}>
          <span>{status.toLowerCase()}</span>
          <SmallCloseIcon cursor='pointer' onClick={()=>props.onRemoveFilter(status)}></SmallCloseIcon>
        </div>
      ))}
    </HStack>
  ) : null;
};

FilterStatus.propTypes = {
  filters: PropTypes.object,
  onRemoveFilter: PropTypes.func
};

FilterStatus.defaultProps = {
  filters: FILTER_DEFAULT,
};

export default React.memo(FilterStatus);
