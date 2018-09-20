import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Checkbox, TableBody, TableCell, TableRow } from '@material-ui/core';
import { wordsInitialState } from '../../context/words';
import { wordsListShape } from '../../context/words/shape';

const getSorting = (order, orderBy) =>
  order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);

const TableBodyCmp = props => {
  const { words, order, orderBy, page, rowsPerPage, isSelected, handleClick } = props;

  return (
    <TableBody>
      {words
        .sort(getSorting(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(word => {
          const { en = '', ua = '', transcription = '', dateCreated, _id } = word;
          const isSelectedCurrent = isSelected(_id);

          return (
            <TableRow
              hover
              onClick={event => handleClick(event, _id)}
              role="checkbox"
              aria-checked={isSelectedCurrent}
              tabIndex={-1}
              key={_id}
              selected={isSelectedCurrent}
            >
              <TableCell padding="checkbox">
                <Checkbox checked={isSelectedCurrent}/>
              </TableCell>
              <TableCell>{en}</TableCell>
              <TableCell>{ua}</TableCell>
              <TableCell>{transcription}</TableCell>
              <TableCell title={new Date(dateCreated).toLocaleString()}>
                {moment(dateCreated).fromNow()}
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
};

TableBodyCmp.propTypes = {
  words: wordsListShape,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  isSelected: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

TableBodyCmp.defaultProps = {
  words: wordsInitialState.words,
};

export default TableBodyCmp;