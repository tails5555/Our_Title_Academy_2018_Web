import React from 'react';

const btnStyle = {
    padding : '0px 8px',
    margin : '5px 5px'
}

const ListPagination = ({ count, size, page, handle }) => {
    const pageNumbers = [];
    const barCount = 10;
    const pageCount = Math.ceil(count / size);
    let base = Math.floor((page - 1) / 10) * 10;

    if(base > 0)
        pageNumbers.push(base);

    for (let i = 1; i <= barCount; i++) {
        let n = base + i;
        if(n > pageCount) break;
        pageNumbers.push(n);
    }

    let n = base + 11;
    if(n <= pageCount)
        pageNumbers.push(n);

    return pageNumbers.map((number, idx) =>
            (number > base && number < base + 11) ?
                <button
                    key={number}
                    id={number}
                    className={(page * 1 === number) ? "w3-small w3-button w3-pink" : "w3-tiny w3-button w3-hover-pink" }
                    style={btnStyle}
                    onClick={handle}
                >
                    {number}
                </button> :
            (idx === 0) ?
                <button
                    key={number}
                    id={number}
                    className="w3-tiny w3-button w3-hover-pink"
                    style={btnStyle}
                    onClick={handle}
                >
                    이전
                </button> :
                <button
                    key={number}
                    id={number}
                    className="w3-tiny w3-button w3-hover-pink"
                    style={btnStyle}
                    onClick={handle}
                >
                    다음
                </button>
    );
}

export default ListPagination;