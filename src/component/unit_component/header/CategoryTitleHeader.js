import React, { Fragment } from 'react';

const CategoryTitleHeader = ({ loading, error, element }) => {
    let categoryView;
    if(loading) {
        categoryView = <h2><i className="fas fa-spinner fa-spin" /> 분류를 불러오는 중입니다...</h2>;
    } else if(error !== null) {
        categoryView = <h2><i className="fas fa-warning" /> 오류! <small>{error}</small></h2>;
    } else if(element !== null) {
        categoryView = <h2>분류 별 콘텐츠 - {element && element.name}</h2>;
    } else {
        categoryView = null;
    }

    return (
        <Fragment>
            <header className="major" style={{ marginTop : '30px' +
                '' }}>
                { categoryView }
            </header>
        </Fragment>
    );
}

export default CategoryTitleHeader;