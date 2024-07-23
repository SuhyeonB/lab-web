import React, { useState } from 'react';
import '../../style/Board.css';
import '../../style/Main.css';

const Pagination = ({ totalPosts, perPage, page, setPage }) => {
    const numPages = Math.ceil(totalPosts / perPage);
    const [currentGroup, setCurrentGroup] = useState(0); 
    const pagesPerGroup = 10; // 한 그룹당 

    const startPage = currentGroup * pagesPerGroup + 1;
    const endPage = Math.min(startPage + pagesPerGroup - 1, numPages);

    const handlePrevGroup = () => {
        setCurrentGroup(currentGroup - 1);
        setPage(startPage - pagesPerGroup); 
    };

    const handleNextGroup = () => {
        setCurrentGroup(currentGroup + 1);
        setPage(startPage + pagesPerGroup);
    };

    return (
        <nav className='pagination'>
            <button onClick={handlePrevGroup} disabled={currentGroup === 0}>
                &lt;&lt;
            </button>
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
                &lt;
            </button>
            {
                Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                    <button
                        key={startPage + i}
                        onClick={() => setPage(startPage + i)}
                        aria-current={page === startPage + i ? "page" : undefined}
                    >
                        {startPage + i}
                    </button>
                ))
            }
            <button onClick={() => setPage(page + 1)} disabled={page === numPages}>
                &gt;
            </button>
            <button onClick={handleNextGroup} disabled={endPage === numPages}>
                &gt;&gt;
            </button>
        </nav>
    );
};

export default Pagination;