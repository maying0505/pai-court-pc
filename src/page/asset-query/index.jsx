import React from 'react';
import { Popover, Row, Col, Table, Card, Form, Button, message} from 'antd';
import FormSet from 'common/FormSet';
import OperationProcessTable from 'common/operationProcessTable';
import * as HTTP from 'units/Axios';
import {inject, observer} from 'mobx-react';

// const _tableWidth = 100/17+'%';
const _tableWidth = '';
const columnsAlign = 'center';

@inject('assetAdd')
@observer
class AssetQueryForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numbers: '',
            loading: true,
            tableListDataSource: [],
            pageInfo: {pageNumber: '1', pageSize: '10'},
            searchInfo: {},
            pagination: {total: 1, pageSize: 10, current: 1},
            ModalBodyStyle: {
                textAlign: 'center',
                fontSize: '17px'
            },
            columns:[
                {
                    title: '移交时间',
                    align: columnsAlign,
                    dataIndex: 'transferDate',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '法院',
                    align: columnsAlign,
                    dataIndex: 'sysOffice.name',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '法官',
                    align: columnsAlign,
                    dataIndex: 'sysUser.name',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '标的物编号',
                    align: columnsAlign,
                    dataIndex: 'numbers',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '标的物名称',
                    align: columnsAlign,
                    dataIndex: 'subjectMatterName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '拍卖阶段',
                    align: columnsAlign,
                    dataIndex: 'stage',
                    width: _tableWidth,
                    render: (text) => text || text === 0 ? this._stageShow(text) : '--'
                },
                {
                    title: '被执行人姓名',
                    align: columnsAlign,
                    dataIndex: 'executorName',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '资产类型',
                    align: columnsAlign,
                    dataIndex: 'type',
                    width: _tableWidth,
                    render: (text) => text ? this._assetType(text) : '--'
                },
                {
                    title: '归属地区',
                    align: columnsAlign,
                    dataIndex: 'city',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '评估价',
                    align: columnsAlign,
                    dataIndex: 'evaluationPrice',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '起拍价',
                    align: columnsAlign,
                    dataIndex: 'startintPrice',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '成交价',
                    align: columnsAlign,
                    dataIndex: 'finalPrice',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '拍卖时间',
                    align: columnsAlign,
                    dataIndex: 'auctionTime',
                    width: _tableWidth,
                    render: (text) => text ? text : '--'
                },
                {
                    title: '看样时间及人员',
                    align: columnsAlign,
                    dataIndex: 'seeingTime',
                    width: 350,
                    render: (text) => text ? this.seeingTimeDo(text) : '--'
                },
                {
                    title: '状态',
                    align: columnsAlign,
                    dataIndex: 'status',
                    width: _tableWidth,
                    render: (text,record) => text || text === 0 ? this._assetStatus(text,record.id) : '--'
                },
                {
                    title: '预约人数',
                    align: columnsAlign,
                    dataIndex: 'reserveNumber',
                    width: _tableWidth,
                    render: (text) => text || text === 0 ? text : '--'
                },
                {
                    title: '实到人数',
                    align: columnsAlign,
                    dataIndex: 'reallyNumber',
                    width: _tableWidth,
                    render: (text) => text || text === 0 ? text : '--'
                },
                {
                    title: '操作',
                    align: columnsAlign,
                    dataIndex: 'id',
                    width: 100,
                    fixed: 'right',
                    render: (text,record) => <Button size="small" onClick={this.editDetail.bind(this,text,record.status,record.type,record.inquestIdTwo)}>详情</Button>
                      
                },
            ],
        }
    }

    componentDidMount() { //预加载数据
        // this.loadlists(this.state.pageInfo) //获取数据列表
        this.handleSearch();
    }

    pageJump = (e) => { //分页跳转
        console.log(e)
        this.setState({
            loading: true,
            tableListDataSource: [],
            pageInfo: {pageNumber: e.current, pageSize: e.pageSize},
            pagination: {...this.state.pagination, current: e.current}
        }, function () {
            this.loadlists({...this.state.pageInfo, ...this.state.searchInfo})
        })
    }
    seeingTimeDo = (text) => {
        let json = JSON.parse(text);
        return json.map((item,index)=>
            <div>{item.seeingTime ? item.seeingTime : '--'} 至 {item.endTime ? item.endTime : '--'}<br></br>{item.userName ? item.userName : '--'}</div>
        )
    }
    _stageShow = (text) => {
        let showText = '';
        switch (text) {
            case 0: showText = '第一次拍卖';break;
            case 1: showText = '第二次拍卖';break;
            case 2: showText = '变卖';break;
            default: showText = '--';
        }
        return showText
    }
    _assetType = (text) => {
        let assetTypeList = sessionStorage.getItem('assetTypeList') ? JSON.parse(sessionStorage.getItem('assetTypeList')) : []
        let assetType = ''
        for (let item of assetTypeList) {
            if (item.value === text) {
                assetType = item.label
            }
        }
        return assetType
    }
    _assetStatus = (text,id) => {
        let assetStatusList = sessionStorage.getItem('assetStatusList') ? JSON.parse(sessionStorage.getItem('assetStatusList')) : []
        let assetStatus = ''
        for (let item of assetStatusList) {
            if (item.status === text) {
                assetStatus = item.name
            }
        }
        
        const content = <OperationProcessTable assetBaseId={id}/>
        const showText = <Popover content={content} title="流程"><span className="status_box">{assetStatus}</span></Popover>
        return showText
    }
    handleSearch = (e) => { //查询请求
        this.setState({
            loading: true
        })
        e ? e.preventDefault(): null;
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (values.auctionTime) {
                values.startAuctionTime = values.auctionTime[0] ?  values.auctionTime[0].format('YYYY-MM-DD HH:mm:ss') : '';
                values.endAuctionTime = values.auctionTime[1] ?  values.auctionTime[1].format('YYYY-MM-DD HH:mm:ss') : '';
            }
            if (values.transferDate) {
                values.startTransferDate = values.transferDate[0] ?  values.transferDate[0].format('YYYY-MM-DD HH:mm:ss') : '';
                values.endTransferDate = values.transferDate[1] ?  values.transferDate[1].format('YYYY-MM-DD HH:mm:ss') : '';
            }
            if (values.seeingTime) {
                values.startseeingTime = values.seeingTime[0] ?  values.seeingTime[0].format('YYYY-MM-DD HH:mm:ss') : '';
                values.endseeingTime = values.seeingTime[1] ?  values.seeingTime[1].format('YYYY-MM-DD HH:mm:ss') : '';
            }
            values.auctionTime = undefined;
            values.transferDate = undefined;
            values.seeingTime = undefined;
            if (values.courtJudge) { //法院法官
                values.officeProvince = values.courtJudge[0];
                values.officeCity = values.courtJudge[1];
                values.officeId = values.courtJudge[2];
                values.sysUserId = values.courtJudge[3];
            }
            values.courtJudge = undefined;

            if (values.adress) { //归属地省市区
                values.province = values.adress[0];
                values.city = values.adress[1];
                values.area = values.adress[2]
            }
            values.adress = undefined;

            this.setState({
                tableListDataSource: [],
                searchInfo: {...this.state.searchInfo, ...values},
                pagination: {total: 1, pageSize: 10, current: 1},
                pageInfo: {pageNumber: '1', pageSize: '10'},
            }, function () {
                this.loadlists({...this.state.pageInfo, ...this.state.searchInfo})
            })
        });
    }

    loadlists = async (data) => { //请求数据函数
        console.log(data)
        try {
            const result = await HTTP.courtList({
                ...data
            });
            console.log('result', result);
            this.setState({
                loading: false
            })
            if (result.success) {
                this.setState({
                    tableListDataSource: result.data.list,
                    pagination: {...this.state.pagination, total: result.data.total},
                })
            } else {
                message.error(result.message);
            }
        } catch (e) {
            this.setState({
                loading: false
            })
            // message.error(e.message);
        }
    }
    handleFormReset = () => { //重置查询
        this.setState({
            loading: true
        })
        this.props.form.resetFields()
        this.setState({
            tableListDataSource: [],
            pageInfo: {pageNumber: '1', pageSize: '10'},
            pagination: {total: 1, pageSize: 10, current: 1},
            searchInfo: {}
        }, function () {
            this.loadlists(this.state.pageInfo)
        })
    }

    editDetail = (id,status,type,userId) => { //编辑
        sessionStorage.setItem('assetBaseId',id)
        sessionStorage.setItem('status',status)
        sessionStorage.removeItem('isRelease')
        sessionStorage.setItem('pageName','court_query_detail')
        let href = '';
        switch(type) {
            case '0': href = `/project/court_query/asset_detail/house_property/${userId ? userId : null}`;break;
            case '1': href = `/project/court_query/asset_detail/vehicle/${userId ? userId : null}`;break;
            case '2': href = `/project/court_query/asset_detail/land/${userId ? userId : null}`;break;
            default: href = '';return;
        }
        sessionStorage.setItem('pageTitle','标的详情');
        this.props.history.push(href)
    }
    
    render() {
        return (
            <div className="table-list">
                <Card bordered={false}>
                        <Form onSubmit={this.handleSearch} layout="inline" className="ant-search-form">
                            <FormSet form={this.props.form}/>
                            <Row>
                                <Col xl={12} lg={24}>
                                    <span style={{float: 'left'}}>
                                        <Button htmlType="submit" type="primary">查询</Button>
                                        <Button style={{marginLeft: 8}} onClick={this.handleFormReset}>重置</Button>
                                    </span>
                                </Col>
                            </Row>
                        </Form>
                        <Table scroll={{ x: 2150 }} bordered rowKey="id" columns={this.state.columns}
                                dataSource={this.state.tableListDataSource} loading={this.state.loading}
                                onChange={this.pageJump} pagination={this.state.pagination}/>
                </Card>
            </div>
        )
    }
}

const AssetQuery = Form.create()(AssetQueryForm)
export default AssetQuery
