/*
Wrapper around Bootstrap's pagination component. Allows instantiation of
a pagination element without the consumer needing to explicitly create a
Pagination.Item to make one. Just pass in the params  :)
*/
import React from 'react';
import { Pagination } from 'react-bootstrap/lib/';

/**
 * @param {size of buttons, number of buttons, current active page, selection handler} 
 */
const MyPagination = ({ bsSize, items, activePage, onSelect }) => {
    let MyPaginationItems = [];
    
    for (let page = 1; page <= items; page++) {
        MyPaginationItems.push(
            <Pagination.Item key={page} active={activePage === page} onClick={() => onSelect(page)}>
                {page}
            </Pagination.Item>
        );
    }


    return (
        <Pagination bsSize={bsSize}>
            {MyPaginationItems}
            <Pagination.Next />
            <Pagination.Last />
        </Pagination>
    );
};

export default MyPagination;