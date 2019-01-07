import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ReactTable from "react-table";
import "react-table/react-table.css";
import matchSorter from 'match-sorter';
import {UserProfile} from "../profile_image";
import {withRouter} from 'react-router-dom';
class UserList extends Component {
    componentWillMount(){
        const {principal} = this.props.accessor;
        this.props.fetchUserList(principal === null || principal.type);
    }
    componentWillUnmount(){
        this.props.resetFetchUserList();
    }
    render(){
        const { users } = this.props.principalList;
        const { principal } = this.props.accessor;
        if(this.props.match && this.props.match.params.method === '_refresh'){
            this.props.resetFetchUserList();
            if(principal.type === 'MANAGER')
                this.props.history.push('/manager/user_list');
            else if(principal.type === 'ADMIN')
                this.props.history.push('/admin/user_list');
        }

        return (
            <section>
                <header id="header">
                    <span className="logo"><strong>Our Title Academy 2018</strong> - USER LIST</span>
                </header>
                <br/><br/>
                <header className="major">
                    <h2>회원 목록 관리</h2>
                </header>
                <h3 className="align-center">관리자[ADMIN]와 매니저[MANAGER]는 회원 목록을 향시에 관리할 수 있습니다.</h3>
                <br/>
                <ReactTable
                    data={users}
                    filterable
                    defaultFilterMethod={(filter, row) =>
                        String(row[filter.id]) === filter.value}
                    columns={[
                        {
                            Header: "회원 로그인 정보",
                            columns: [
                                {
                                    Header: "ID",
                                    accessor: "loginId",
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["loginId"] }),
                                    filterAll: true,
                                    Cell : row =>
                                        <div>
                                            <UserProfile loginId={row.value} />
                                            <br/><br/>
                                            <Link to={`user_info/${row.value}`}>
                                                <button className="w3-button w3-pale-red">
                                                    <i className="icon fa-search-plus"></i> {row.value}
                                                </button>
                                            </Link>
                                        </div>
                                },
                                {
                                    Header: "별명",
                                    accessor: "nickname",
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["nickname"] }),
                                    filterAll: true
                                }
                            ]
                        },
                        {
                            Header: "회원 정보",
                            columns: [
                                {
                                    Header: "회원 이름",
                                    accessor: "name",
                                    filterMethod: (filter, rows) =>
                                        matchSorter(rows, filter.value, { keys: ["name"] }),
                                    filterAll: true
                                },
                                {
                                    Header: "회원 권한",
                                    accessor: "type",
                                    filterMethod: (filter, row) => {
                                        if (filter.value === "all") {
                                            return true;
                                        }
                                        if (filter.value === "admin") {
                                            return row[filter.id] === 'ADMIN';
                                        }
                                        if (filter.value === "manager") {
                                            return row[filter.id] === 'MANAGER';
                                        }
                                        return row[filter.id] === 'USER';
                                    },
                                    Filter: ({ filter, onChange }) =>
                                        <select
                                            onChange={event => onChange(event.target.value)}
                                            style={{ width: "100%" }}
                                            value={filter ? filter.value : "all"}
                                        >
                                            <option value="all">모두 조회</option>
                                            <option value="admin">관리자(ADMIN)</option>
                                            <option value="manager">매니저(MANAGER)</option>
                                            <option value="user">회원(USER)</option>
                                        </select>
                                }
                            ]
                        }
                    ]}
                    defaultPageSize={10}
                    className="-striped -highlight w3-center"
                />
            </section>
        )
    }
}
export default withRouter(UserList);