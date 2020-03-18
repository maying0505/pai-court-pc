import React from 'react';
import PropTypes from 'prop-types';
// import Upload from 'components/VideoUpload/index.tsx';
import { Upload, Icon, message, } from 'antd';
import {imgUrl} from 'units/Axios/http';
import PictureProcessing from 'common/pictureProcessing';
import './index.less';

class PicturesWall extends React.Component {
    static propTypes = {
        isD: PropTypes.bool,
        defaultFileList: PropTypes.array,
        disabled: PropTypes.bool,
        componentsIndex: PropTypes.number,
        componentsStyle: PropTypes.string,
        onPicturesWallChange: PropTypes.func,
        isDelete: PropTypes.bool,
        showUploadList: PropTypes.bool,
        businessId: PropTypes.string,
        businessType: PropTypes.string,
    };

    static defaultProps = {
        isD: false,
        businessId: '',
        businessType: '',
        showUploadList: true,
        defaultFileList: [],
        disabled: false,
        componentsIndex: 0,
        componentsStyle: '',
        isDelete: true,
        onPicturesWallChange: () => {
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            carouseCurrentIndex: 0,
            fileList: [],
            multiple: true,
            nextProps: [],
            carouselList: [],
            pictureProcessingVisible: false
        };
    }

    componentDidMount() { //预加载数据
        console.log('image',this.props)
        // this.fileListChange()
    }

    componentWillReceiveProps(nextProps) { //组件接收到新的props时调用
        if (nextProps.defaultFileList != this.state.nextProps && nextProps.defaultFileList) {
            if (nextProps.defaultFileList.length > 0 && nextProps.defaultFileList[0] != "") {
                this.setState({
                    nextProps: nextProps.defaultFileList
                })
                this.fileListChange(nextProps)
            }
        }
    }

    fileListChange = (nextProps) => {
        this.setState({
            fileList: nextProps.defaultFileList
        }, function () {
            console.log(this.state.fileList)
        })
    }

    handlePreview = (file) => {
        const {fileList} = this.state;
        let goToIndex = null;
        if (fileList.length > 0) {
            fileList.forEach((item, index) => {
                if (item.uid === file.uid) {
                    goToIndex = index;
                }
            });
        }
        this.setState({
            carouseCurrentIndex: goToIndex,
            pictureProcessingVisible: true,
            carouselList: fileList,
        }, () => {
            this.slider && this.slider.innerSlider.slickGoTo(goToIndex);
        });
    };

    handleChange = ({fileList, file, event}) => {
        console.log('fileList:',fileList)
        console.log('file:',file)
        console.log('file_event',event)
        fileList = fileList.filter((file) => {
            if (file.response) {
                if (file.response.success) {
                    file.thumbUrl = file.response.data.pathThumb2FileName;
                    return true;
                } else {
                    return false;
                }
            } else {
                return true;
            }
        });
        console.log(fileList)
        this.setState({
            fileList
        }, function () {
            console.log(this.state.fileList)
        })

        file.status === 'error' ? message.error('上传失败！') : null

        if (file.response) {
            if (file.status !== 'removed' && !file.response.success) {
                message.error('上传失败！')
            }
        }
        file.status !== 'error' && file.status ? this.props.onPicturesWallChange(fileList, this.props.componentsIndex, this.props.componentsStyle, file.status) : null

        // console.log(fileList[fileList.length-1].response)
    };
    beforeUpload = (file) => { //上传前控制图片的格式和大小
        console.log('eee:', file)
        // const isJPG = file.type === 'image/jpeg';
        // if (!isJPG) {
        //   message.error('You can only upload JPG file!');
        // }
        const isLt2M = file.size / 1024 / 1024 < 10
        if (!isLt2M) {
            message.error('文件必须小于10M！')
        }
        // return isJPG && isLt2M;
        return isLt2M
    };

    _onRemove = (file) => {
        const {isDelete} = this.props;
        if (!isDelete) {
            return false;
        }
        if (file.response && file.response.data) {
            return true;
        }
        if (file.deletable) {
            return true;
        } else if (file.deletable === false) {
            message.warn('不能删除该图片');
            return false;
        } else {
            return true;
        }
    };

    pictureProcessingHandleCancel = () =>{
        this.setState({
            pictureProcessingVisible: false,
            carouseCurrentIndex: 0
        })
    }

    render() {
        const {
            pictureProcessingVisible, carouselList, carouseCurrentIndex, multiple, 
        } = this.state;

        const {showUploadList,isD} = this.props;
      
        return (
            <div className="clearfix flex-1">
                {
                    this.state.fileList.length > 0 ?
                        <div className={isD ? 'show' : ''}>
                            <Upload
                                action={imgUrl}
                                listType="picture-card"
                                showUploadList={showUploadList}
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                                data= {{businessId:this.props.businessId,businessType:this.props.businessType}}
                                name="attach"
                                headers={{token:sessionStorage.getItem('token_y')}}
                                multiple={multiple}
                                onRemove={this._onRemove}
                            >
                                {this.props.disabled ? null : <div>
                                    <Icon type="plus"/>
                                    <div className="ant-upload-text">{`上传（<10M）`}</div>
                                </div>}
                            </Upload>
                        </div>
                        :
                        <div className={isD ? 'show' : ''}>
                            <Upload
                                action={imgUrl}
                                showUploadList={showUploadList}
                                listType="picture-card"
                                fileList={this.state.fileList}
                                onPreview={this.handlePreview}
                                onChange={this.handleChange}
                                beforeUpload={this.beforeUpload}
                                name="attach"
                                headers={{token:sessionStorage.getItem('token_y')}}
                                data= {{businessId:this.props.businessId,businessType:this.props.businessType}}
                                multiple={multiple}
                            >
                                {this.props.disabled ? null :
                                    <div>
                                        <Icon type="plus"/>
                                        <div className="ant-upload-text">{`上传（<10M）`}</div>
                                    </div>}
                            </Upload>
                        </div>
                }
                <PictureProcessing carouseCurrentIndex={carouseCurrentIndex} pictureProcessingHandleCancel={this.pictureProcessingHandleCancel} pictureProcessingVisible={pictureProcessingVisible} carouselList={carouselList}/>
            </div>
        );
    }
}

export default PicturesWall
