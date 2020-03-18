import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout,BackTop,Spin} from 'antd';
import 'style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import AssetQuery from 'page/asset-query';
import HouseProperty from 'components/AssetDetail/house-property';
import NotFound from 'components/NotFound';

const {Content} = Layout;

export default class App extends Component {
    state = {
        loading: false,
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
        pageRouters: [
            {
                href: '/project/court_query',
                component: AssetQuery
            },
            {
                href: '/project/court_query/asset_detail/house_property/:userId',
                component: HouseProperty
            },
            {
                href: '/project/court_query/asset_detail/vehicle/:userId',
                component: HouseProperty
            },
            {
                href: '/project/court_query/asset_detail/land/:userId',
                component: HouseProperty
            },
        ]
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed,pageRouters} = this.state;
        const {location} = this.props;
        let name;
        if (sessionStorage.getItem("mspa_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(sessionStorage.getItem("mspa_user")).username : location.state.username;
        }
        let isSmallSider = false;
        if (this.props.location.pathname.indexOf('asset_detail/1') !== -1) {
            isSmallSider = true;
        }
        return (
            <div className='yt-admin-framework'>
                <Spin key="yt-admin-framework-layout" spinning={this.state.loading} size="large">
                    <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                    <SiderCustom collapsed={collapsed} path={location.pathname}/>
                    <Content className="yt-admin-framework-content" style={{marginLeft : `${isSmallSider? '340px' : '220px'}`}}>
                    <Switch>
                            {pageRouters.map((item,index)=>
                                <Route exact key={index} path={item.href} component={item.component} />
                            )}
                            <Route component={NotFound}/>
                        </Switch>
                    </Content>
                    
                    <BackTop style={{right: '40px', bottom: '60px'}}/>
                </Spin>
            </div>
        );
    }
}
