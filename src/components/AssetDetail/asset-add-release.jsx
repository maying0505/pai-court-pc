import React from 'react';
import PropTypes from 'prop-types';
import { Row, message, Spin, Modal, Col, Divider, Input  } from 'antd';
import LodashDebounce from 'common/debounce';
import PicturesWall from 'components/ImgUpload';
import * as HTTP from 'units/Axios';
import './index.less'

class AssetAddRelease extends React.Component {
    static propTypes = {
        auctionUrl: PropTypes.string,
        userId: PropTypes.string,
        visible: PropTypes.bool,
        assetAddReleaseCancel: PropTypes.func,
        historyId: PropTypes.string,
    };

    static defaultProps = {
        auctionUrl: '',
        userId: '',
        historyId: '',
        visible: false,
        assetAddReleaseCancel: ()=>{},
    };
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            detailShow: [
                {
                    label: "权证情况",
                    fieldName: 'warrants',
                },
                {
                    label: "标的所有人",
                    fieldName: 'owner',
                },
                {
                    label: "评估鉴定基准日",
                    fieldName: 'evaluateDate',
                },
                {
                    label: "标的现状",
                    child: [
                        {
                            label: "房屋用途",
                            fieldName: 'purposes',
                        },
                        {
                            label: "土地性质",
                            fieldName: 'landNature',
                        },
                        {
                            label: "土地用途",
                            fieldName: 'landUse',
                        },
                        {
                            label: "经营情况",
                            fieldName: 'operating',
                        },
                        {
                            label: "是否已腾空",
                            fieldName: 'vacate',
                        },
                        {
                            label: "租凭情况",
                            fieldName: 'lease',
                        },
                        {
                            label: "过户情况",
                            fieldName: 'transfer',
                        },
                        {
                            label: "钥匙",
                            fieldName: 'haveKey',
                        },
                    ]
                },
                {
                    label: "提供的文件",
                    fieldName: 'file',
                },
                {
                    label: "权利限制情况",
                    child: [
                        {
                            label: "查封",
                            fieldName: 'seal',
                        },
                        {
                            label: "抵押",
                            fieldName: 'mortgage',
                        },
                    ]
                },
                {
                    label: "标的物介绍",
                    child: [
                            {
                                label: "建筑总面积",
                                fieldName: 'constructionArea',
                            },
                            {
                                label: "公摊总面积",
                                fieldName: 'publicArea',
                            },
                            {
                                label: "土地总面积",
                                fieldName: 'landArea',
                            },
                            {
                                label: "房产年龄",
                                fieldName: 'productYears',
                            },
                            {
                                label: "装修情况",
                                fieldName: 'decoration',
                            },
                            {
                                label: "房屋户型",
                                fieldName: 'roomType',
                            },
                            {
                                label: "房屋楼层",
                                fieldName: 'floor',
                            },
                            {
                                label: "房屋朝向",
                                fieldName: 'oriented',
                            },
                            {
                                label: "周边配套",
                                fieldName: 'supportingFacilities',
                            },
                            {
                                label: "其他介绍",
                                fieldName: 'otherDescription',
                            },
                    ]
                },
                {
                    label: "标的物估值",
                    child: [
                            {
                                label: "标的评估总价",
                                fieldName: 'evaluationPrice',
                            },
                            {
                                label: "税费情况",
                                fieldName: '',
                            },
                            {
                                label: "其他费用情况",
                                fieldName: 'otherFee',
                            },
                    ]
                },
            ],
            showArr: [
                {
                    label: '标题',
                    fieldName: 'name',
                    width: '89%',
                    style:'long',
                },
                {
                    label: '起拍价',
                    fieldName: 'startintPrice',
                },
                {
                    label: '保证金',
                    fieldName: 'bond',
                },
                {
                    label: '评估价',
                    fieldName: 'evaluationPrice',
                },
                {
                    label: '加价幅度',
                    fieldName: 'price',
                },
                {
                    label: '竞价周期',
                    fieldName: 'biddingCycle',
                },
                {
                    label: '延时周期',
                    fieldName: 'delayedCycle',
                },
                {
                    label: '竞买公告',
                    fieldName: 'biddingAnnouncement',
                    style: 'scrollBox',
                    width: '90%'
                },
                {
                    label: '竞买须知',
                    fieldName: 'biddingInstructions',
                    style: 'scrollBox',
                    width: '90%'
                },
                {
                    label: '标的物介绍',
                    fieldName: 'html',
                    style: 'scrollBox',
                    width: '90%'
                },
            ],
            detailData: {},
            imgDefaultData: [],
            isSave: true,
            imgSavaData: {},
            assetBaseId: '',
            isShow: true,
            userId: '',
            auctionUrl: '',
            videoUrl: '',
            panoramicViewUrl: ''
        }
    }

    componentDidMount() { //预加载数据
        this.propsDo(this.props);
    }
    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        this.propsDo(nextProps);
    }

    propsDo = (props) => {
        console.log('props',props)
        if (!props.visible) {
            return
        }
        this.setState({
            userId: props.userId,
            auctionUrl: props.auctionUrl
        })
        this._getDetailData(props.userId,props.auctionUrl)
    }
    
    _getDetailData = async (id,auctionUrl) => { 
        try {
            const result = await HTTP.releaseGetData1({
                baseId: id,
                url: auctionUrl
            });
            this.setState({
                loading: false,
            })
            if (result.success) {
                let data = result.data;
                this.setState({
                    detailData: data,
                })
                this.imgDataDo(data.detailImageList ? data.detailImageList : []);
            } else {
                message.error(result.message);
            }
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    }

    imgDataDo = (data) => {
        let imgDefaultDataBoxs = [];
        for (let item of data) {
            let imgDefaultDataBox = {};
            imgDefaultDataBox['bigUrl'] = item['waterMarkImage'] ? item['waterMarkImage']: ''
            imgDefaultDataBox['url'] = item['pathThumb2FileName'] ? item['pathThumb2FileName']: ''
            imgDefaultDataBox['uid'] = `images${Math.random()}`
            imgDefaultDataBox['status'] = 'done'
            imgDefaultDataBoxs.push(imgDefaultDataBox)
        }
        this.setState({
            imgDefaultData: [...this.state.imgDefaultData,...imgDefaultDataBoxs],
        })
        
    }

    onPicturesWallChange = (event,index,style,status) =>{ //处理图片上传数据
        this.setState({
            isSave: false
        })
        console.log('status',status)
        if (status === 'uploading') return
        let imgSaveBox = []
        let isSaveBefore = true
        let imgSavaDataB = this.state.imgSavaData

        console.log(JSON.stringify(event))
        for (let i in event) {
            if (event[i].status !== 'done' && event[i].status) {
                isSaveBefore = false
            }
        }
        console.log(event)
        console.log(imgSaveBox)
        this.setState({
            imgSavaData: imgSaveBox,
            isSave: isSaveBefore
        },function(){
            console.log(this.state.imgSavaData)
        })

    }
    /**
     * @desc 添加防抖，防止连击
     * */
    _onLookSave = LodashDebounce((e) => this.handleSave(e));

    handleSave = (e) => {        
        e.preventDefault();
        if (!this.state.isSave){
            message.warning('请在所有文件上传完成后提交或保存!')
            return
        }
        this.setState({
            loading: true,
        })
        this._save()
    }
   
    _save = async () => { 
        try {
            const result = await HTTP.releaseSave({
                baseId: this.state.userId,
                url: this.state.auctionUrl,
                videoUrl: this.state.videoUrl,
                panoramicViewUrl: this.state.panoramicViewUrl
            });
            console.log('result', result);
            this.setState({
                loading: false,
            })
            if (result.success) {
                message.success('发布成功！');
                this.handleOk();
            } else {
                message.error(result.message);
            }
        } catch (e) {
            this.setState({
                loading: false,
            })
        }
    }
   
    handleFormBack = () => {
        this.props.history.go(-1);
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            detailData: {},
            loading: true
        },function(){
            this.props.assetAddReleaseCancel(true)
        })
        
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            detailData: {},
            loading: true
        },function(){
            this.props.assetAddReleaseCancel()
        })
    }
    warrantsDo = (data) => {
        if (data) {
            let text = '';
            for (let i in data) {
                console.log('text1',data[i])
                text = <span>{text}<span>{i}：{data[i] ? data[i] : '--'}</span><br></br></span>
            }
            return text;
        } else {
            return '--'
        }
    }
    contextShowDo = (data,item) => {
        if (item.child) {
            let text = '';
            for (let val of item.child) {
                text = <span>{text}<span>{val.label}：{data[val.fieldName] ? data[val.fieldName] : '--'}</span><br></br></span>
            }
             return text
        } else if (data[item.fieldName]){
            return <span>{data[item.fieldName]}</span>
        } else {
            return '--'
        }
    }
    detailShowDo = () => {
        let data = this.state.detailData['checkSituationJson'];
        console.log('detailShow',data)
        if (data) {
            return (
                this.state.detailShow.map((item,index)=>
                <div key={index}>
                    <div className="flex flex-align-center">
                        <span style={{marginRight: '10px'}}>{item.label}：</span>
                        {item.fieldName === 'warrants' ? 
                            this.warrantsDo(data[item.fieldName]) : 
                            this.contextShowDo(data,item)
                            
                        }
                    </div>
                    <Divider />
                </div>
            ))
        } else {
            return '--'
        }
    }
    panoramicViewUrlDo = (e) => {
        this.setState({
            panoramicViewUrl: e.target.value
        })
    }

    videoUrlDo = (e) => {
        this.setState({
            videoUrl: e.target.value
        })
    }
    render() {
        const { visible, userId } = this.props;
        const { showArr, detailData, imgDefaultData, loading } = this.state;
        return (
            <Modal
                title="标的发布"
                visible={visible}
                onOk={this._onLookSave}
                onCancel={this.handleCancel}
                destroyOnClose={true}
                okText="发布"
                cancelText="关闭"
                width="70%"
                >
                <Spin size="large" spinning={loading}>
                    <Row>
                        {showArr.map((item,index)=> 
                            <Col xl={item.style === 'long' || item.style === 'scrollBox' ? 24 : 8} lg={24} key={index} className="text_center" style={{marginBottom: '15px'}}>
                                <span>{item.label}：</span>
                                <span className={`show_input text_left ${item.style === 'scrollBox' ? 'scroll_box' :''} ${item.fieldName === 'html' ? 'detail_show_html' :''}`} style={{width: `${item.width ? item.width : '70%'}`}}>
                                    {item.fieldName === 'html' ? <span dangerouslySetInnerHTML = {{ __html:detailData[item.fieldName] ? detailData[item.fieldName] : '--' }}></span> :
                                        <span>{detailData[item.fieldName] ? detailData[item.fieldName] : '--'}</span>
                                    }
                                </span>
                            </Col>
                        )}
                        <Col md={24} sm={24}className="text_center" style={{marginBottom: '15px'}}>
                            <div className="flex">
                                <span className="upload_label width_2" style={{width: '8%'}}>图片：</span>
                                <PicturesWall isD={true} businessId={userId} businessType={'P02'} defaultFileList={imgDefaultData} onPicturesWallChange={this.onPicturesWallChange.bind(this)} />
                            </div>
                        </Col>
                        <Col md={24} sm={24} className="text_center" style={{marginBottom: '15px'}}>
                            <span>全景链接：</span>
                            <span className="show_input text_left" style={{width: "90%", border: 'none'}}>
                                <Input onChange={this.panoramicViewUrlDo}/>
                            </span>
                        </Col>
                        <Col md={24} sm={24} className="text_center" style={{marginBottom: '15px'}}>
                            <span>视频链接：</span>
                            <span className="show_input text_left" style={{width: "90%", border: 'none'}}>
                                <Input onChange={this.videoUrlDo}/>
                            </span>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        )
    }
}

export default AssetAddRelease
