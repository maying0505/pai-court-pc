import React from 'react';
import PropTypes from 'prop-types';
import { Radio , Spin, Row, Col, Modal, message, Checkbox } from 'antd';
import * as HTTP from 'units/Axios';
import eyeImg from 'style/img/eye.png';
import PictureProcessing from 'common/pictureProcessing';
import isEqual from 'lodash/isEqual';
import cloneDeep from 'lodash/cloneDeep';
import './index.less';

const RadioGroup = Radio.Group;
Array.prototype.remove = function(val) { 
    var index = this.indexOf(val); 
    if (index > -1) { 
        this.splice(index, 1); 
    } 
};




class ImageDownload extends React.Component {
    static propTypes = {
        imageDownloadVisible: PropTypes.bool,
        imageDownloadId: PropTypes.string,
        imageDownloadHandleCancel: PropTypes.func,
    };

    static defaultProps = {
        imageDownloadHandleCancel: ()=>{},
        imageDownloadVisible: false,
        imageDownloadId: '',
    };

    constructor(props) {
        super(props)
        this.state = {
            indeterminate: false,
            allImgList: {},
            loading: true,
            isOnMouseOver: {},
            carouselList: [],
            pictureProcessingVisible: false,
            carouseCurrentIndex: 0,
            imgUploadArray: [
                {
                    label: '执行裁定书',
                    fieldName: 'adjudicationImg',
                    businessType: 'A01'
                },
                {
                    label: '委托告知书',
                    fieldName: 'notificationImg',
                    businessType: 'A02'
                },
                {
                    label: '小区大门',
                    fieldName: 'villageGateImg',
                    businessType: 'A03'
                },
                {
                    label: '小区环境',
                    fieldName: 'environmentImg',
                    businessType: 'A04'
                },
                {
                    label: '标的物楼栋外观',
                    fieldName: 'floorAppearanceImg',
                    businessType: 'A05'
                },
                {
                    label: '单元门入口',
                    fieldName: 'unitGateEntranceImg',
                    businessType: 'A06'
                },
                {
                    label: '房屋入口',
                    fieldName: 'houseEntranceImg',
                    businessType: 'A07'
                },
                {
                    label: '客厅',
                    fieldName: 'livingRoomImg',
                    businessType: 'A08'
                },
                {
                    label: '餐厅',
                    fieldName: 'restaurantImg',
                    businessType: 'A09'
                },
                {
                    label: '卧室',
                    fieldName: 'bedroomImg',
                    businessType: 'A010'
                },
                {
                    label: '厨房',
                    fieldName: 'kitchenImg',
                    businessType: 'A011'
                },
                {
                    label: '卫生间',
                    fieldName: 'toiletImg',
                    businessType: 'A012'
                },
                {
                    label: '阳台',
                    fieldName: 'balconyImg',
                    businessType: 'A013'
                },
                {
                    label: '物业入口',
                    fieldName: 'intakeImg',
                    businessType: 'A014'
                },
                {
                    label: '室内图',
                    fieldName: 'indoorImg',
                    businessType: 'A015'
                },
                {
                    label: '其他',
                    fieldName: 'otherImg',
                    businessType: 'A016'
                },
            ],
            isAllChoose: false,
            isWatermark: 1,
            ids: [],
            checkedList: {},
        }
    }
    
    componentWillMount(){ //预加载数据
        this.propsGet(this.props);
    }
    componentWillReceiveProps(nextProps){ //组件接收到新的props时调用
        // this.propsGet(nextProps);
    }

    propsGet = (props) => {
       this._imageDownloadList(props.imageDownloadId)
    }

    _imageDownloadList = async (id) => { //图片列表
        try {
            const result = await HTTP.imageDownList({
                assetBaseId: id,
            });
            this.setState({
                loading: false
            })
            console.log('result', result);
            if (result.success) {
                this.setState({
                    allImgList: result.data ? cloneDeep(result.data) : {},
                },()=>{
                    console.log('allImgList',this.state.allImgList);
                    console.log('checkedList',this.state.checkedList);
                });
            } else {
                message.error(result.message);
            }
        } catch (e) {
            this.setState({
                loading: false
            })
        }
    };
    
    _imageDownloadHandleOk = (e) => { //状态更改保存提交
        e.preventDefault();
        this.setState({
            loading: true
        })
        if (this.state.isAllChoose) {
            this._allImageDownloadSave();
        } else {
            this._imageDownloadSave();
        }
        
    };
    _allImageDownloadSave = async () => { //全部下载
        try {
            const result = await HTTP.imageDownAll({
                assetBaseId: this.props.imageDownloadId,
                type: this.state.isWatermark,
            });
            this.setState({
                loading: false
            })
            console.log('result', result);
            if (result.success) {
                window.open(result.data)
            } else {
                message.error(result.message);
            }
        } catch (e) {
            this.setState({
                loading: false
            })
        }
};
    _imageDownloadSave = async () => { //多张下载
            try {
                const result = await HTTP.imageDown({
                    assetBaseId: this.props.imageDownloadId,
                    type: this.state.isWatermark,
                    ids: JSON.stringify(this.state.ids)
                });
                this.setState({
                    loading: false
                })
                if (result.success) {
                    window.open(result.data)
                } else {
                    message.error(result.message);
                }
            } catch (e) {
                this.setState({
                    loading: false,
                });
            }
    };

    _imageDownloadHandleCancel = (e) => {
        console.log(e);
        this.props.imageDownloadHandleCancel()
    }

    onMouseOverDo = (fieldName,key) => {
        let isOnMouseOverBefore = this.state.isOnMouseOver;
        if (!isOnMouseOverBefore[fieldName]){
            isOnMouseOverBefore[fieldName] = [];
        }
        isOnMouseOverBefore[fieldName][key] = true;
        this.setState({
            isOnMouseOver: isOnMouseOverBefore
        })
    }

    onMouseLeave = (fieldName,key) => {
        let isOnMouseOverBefore = this.state.isOnMouseOver;
        if (!isOnMouseOverBefore[fieldName]){
            isOnMouseOverBefore[fieldName] = [];
        }
        isOnMouseOverBefore[fieldName][key] = false;
        this.setState({
            isOnMouseOver: isOnMouseOverBefore
        })
    }

    pictureProcessingHandleCancel = () =>{
        this.setState({
            pictureProcessingVisible: false,
            carouseCurrentIndex: 0
        })
    }

    showBigImg = (imgList) => {
        console.log('imgList',imgList)
        this.setState({
            carouselList: imgList,
            pictureProcessingVisible: true
        })
    }

    choose = (fieldName,key) => {
        const {allImgList, checkedList, ids:idsBefore} = this.state;
        console.log('allImgList before',allImgList);
        console.log('checkedList before',checkedList);
        let isAllChoose = false;
        if (checkedList[fieldName] && checkedList[fieldName][key]) {
            checkedList[fieldName][key] = false;
            idsBefore.remove(allImgList[fieldName][key]['id']);
        } else {
            if (!checkedList[fieldName]){
                checkedList[fieldName] = [];
            }
            checkedList[fieldName][key] = allImgList[fieldName][key];
            idsBefore.push(allImgList[fieldName][key]['id']);
        }
        if (isEqual(checkedList,allImgList)){
            isAllChoose = true;
        } else {
            isAllChoose = false;
        }
        this.setState({
            isAllChoose,
            allImgList,
            checkedList: checkedList,
            ids: idsBefore,
        })
    }

    onAllChoose = (e) => {
        let idsBefore = [];
        for (let i in this.state.allImgList) {
            for (let item of this.state.allImgList[i]) {
                idsBefore.push(item.id)
            }
        }
        this.setState({
            ids: idsBefore,
            isAllChoose: e.target.checked,
            checkedList: e.target.checked ? cloneDeep(this.state.allImgList) : {}
        },function(){
            console.log(this.state.checkedList)
        });
    }

    onIsWatermark = (e) => {
        console.log(e.target.value)
        this.setState({
            isWatermark: e.target.value,
        });
    }
   
    render() {
        const { checkedList, indeterminate, allImgList, imgUploadArray, carouseCurrentIndex, pictureProcessingVisible, loading, isOnMouseOver, carouselList, isAllChoose, isWatermark } = this.state;
        return (
            <Modal
                title="下载"
                visible={this.props.imageDownloadVisible}
                onOk={this._imageDownloadHandleOk}
                onCancel={this._imageDownloadHandleCancel}
                okText="下载"
                cancelText="取消"
                width= '40%'
                destroyOnClose={true}
                >
                <Spin size="large" spinning={loading}>
                    <Checkbox
                        indeterminate={indeterminate}
                        onChange={this.onAllChoose}
                        checked={isAllChoose}
                    >
                        全选
                    </Checkbox>
                    <RadioGroup onChange={this.onIsWatermark} defaultValue={1}>
                        <Radio value={1}>有水印</Radio>
                        <Radio value={0}>无水印</Radio>
                    </RadioGroup>
                    <Row>
                        {imgUploadArray.map((item,index)=>{
                            return (
                                allImgList[item.fieldName] && allImgList[item.fieldName].length > 0 && <Col md={24} sm={24} key={index} style={{margin: '10px 0'}}>
                                <div className="img_download_title"><span className="img_download_title_tip"></span>{item.label}</div>
                                <div className="flex flex-wrap-wrap">
                                    {
                                        allImgList[item.fieldName].map((val,key)=> {
                                            return (
                                                <div key={`allImageList_key_${key}`} className="img_download_box" onMouseLeave={() => this.onMouseLeave(item.fieldName,key)} onMouseOver={() => this.onMouseOverDo(item.fieldName,key)}>
                                                {isOnMouseOver[item.fieldName] && isOnMouseOver[item.fieldName][key] && <img src={eyeImg} onClick={this.showBigImg.bind(this,allImgList[item.fieldName])} className="img_download_eye"/>}
                                                <Checkbox checked={checkedList[item.fieldName] && checkedList[item.fieldName][key]} value={val['id']} className="img_download_checkbox" onClick={() => this.choose(item.fieldName,key)}>
                                                    {isOnMouseOver[item.fieldName] && isOnMouseOver[item.fieldName][key] && <div className="img_download_mask"></div>}
                                                    <img className="img_download_img" src={val.pathThumb2FileName}/>
                                                </Checkbox>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </Col>
                            )
                        }
                            
                        )}
                    </Row>
                </Spin>
                <PictureProcessing carouseCurrentIndex={carouseCurrentIndex} pictureProcessingHandleCancel={this.pictureProcessingHandleCancel} pictureProcessingVisible={pictureProcessingVisible} carouselList={carouselList}/>
            </Modal>              
        );
    }
}
export default ImageDownload