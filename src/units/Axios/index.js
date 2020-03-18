import { http } from './http';
import apis from './apis';

export function getCsrfToken(params = {}) {
    return http.get(apis.getCsrfToken, params);
}



export function login(params = {}) {
    return http.get(apis.login, params)
}

// export function siderChild(params = {}) {
//     return http.get(apis.siderChild, params)
// }

export function dictJudge(params = {}) {
    return http.get(apis.dictJudge, params)
}

export function assetType(params = {}) {
    return http.get(apis.assetType, params)
}

export function assetStatus(params = {}) {
    return http.get(apis.assetStatus, params)
}

export function fileupload(params = {}, config = {}) {
    return http.post(apis.fileupload, params, config)
}

export function areaGet(params = {}) {
    return http.get(apis.areaGet, params)
}

export function bidListGet(params = {}) {
    return http.post(apis.getBidList, params)
}

export function bidListGet2(params = {}) {
    return http.post(apis.getBidList2, params)
}

export function saveHouseBid(params = {}) {
    return http.post(apis.saveHouseBid, params)
}

export function saveCarBid(params = {}) {
    return http.post(apis.saveCarBid, params)
}

export function saveLandBid(params = {}, config = {}) {
    return http.post(apis.saveLandBid, params, config)
}

export function houseStandardInfo(params = {}) {
    return http.get(apis.houseStandardInfo, params)
}

export function getOutsideOperator(params = {}) {
    return http.get(apis.getOutsideOperator, params)
}

export function setFinalPrice(params = {}) {
    return http.post(apis.setFinalPrice, params)
}

export function operationProcess(params = {}) {
    return http.get(apis.operationProcess, params)
}

export function getstatus(params = {}) {
    return http.get(apis.getstatus, params)
}

export function changestatus(params = {}) {
    return http.post(apis.changestatus, params)
}

export function getstatusByAssetId(params = {}) {
    return http.get(apis.getstatusByAssetId, params)
}

export function releaseGetData(params = {}) {
    return http.get(apis.releaseGetData, params)
}

export function getRelease(params = {}) {
    return http.get(apis.getRelease, params)
}

export function viewSampleGet(params = {}) {
    return http.get(apis.viewSampleGet, params)
}

export function rollbackGet(params = {}) {
    return http.get(apis.rollbackGet, params)
}

export function adoptGet(params = {}) {
    return http.get(apis.adoptGet, params)
}

export function saveHouse(params = {}) {
    return http.post(apis.saveHouse, params)
}

export function saveCar(params = {}) {
    return http.post(apis.saveCar, params)
}

export function saveLand(params = {}) {
    return http.post(apis.saveLand, params)
}

export function submitInquest(params = {}) {
    return http.get(apis.submitInquest, params)
}

export function lookSampleTimes(params = {}) {
    return http.get(apis.lookSampleTimes, params)
}

export function lookSampleInfo(params = {}) {
    return http.get(apis.lookSampleInfo, params)
}

export function getbidInvestigate(params = {}) {
    return http.get(apis.getbidInvestigate, params)
}

export function getbidSample(params = {}) {
    return http.get(apis.getbidSample, params)
}

export function saveRetinueInquest(params = {}) {
    return http.post(apis.saveRetinueInquest, params)
}

export function saveRetinueLook(params = {}) {
    return http.post(apis.saveRetinueLook, params)
}

export function saveSummary(params = {}) {
    return http.post(apis.saveSummary, params)
}

export function reNumberVerification(params = {}) {
    return http.post(apis.reNumberVerification, params)
}

export function isMaster(params = {}) {
    return http.post(apis.isMaster, params)
}

export function inquestStatusGet(params = {}) {
    return http.post(apis.inquestStatusGet, params)
}

export function getInquestBid(params = {}) {
    return http.post(apis.getInquestBid, params)
}

export function inspectSubmit(params = {}) {
    return http.post(apis.inspectSubmit, params)
}


export function lookSampleDetail(params = {}) {
    return http.post(apis.lookSampleDetail, params)
}

export function lookStatusGet(params = {}) {
    return http.post(apis.lookStatusGet, params)
}

export function saveRemake(params = {}) {
    return http.post(apis.saveRemake, params)
}

export function updatepwd(params = {}) {
    return http.get(apis.updatepwd, params)
}

export function sampleSubmit(params = {}) {
    return http.post(apis.sampleSubmit, params)
}

export function keyList(params = {}) {
    return http.post(apis.keyList, params)
}

export function keyIdentify(params = {}) {
    return http.post(apis.keyIdentify, params)
}

export function keyRecordSave(params = {}) {
    return http.post(apis.keyRecordSave, params)
}

export function keyRecordSaveReturn(params = {}) {
    return http.post(apis.keyRecordSaveReturn, params)
}

export function keyRecordDetail(params = {}) {
    return http.post(apis.keyRecordDetail, params)
}

export function keyCollarList(params = {}) {
    return http.post(apis.keyCollarList, params)
}

export function keyCollarSave(params = {}) {
    return http.post(apis.keyCollarSave, params)
}

export function keyCollarReturnSave(params = {}) {
    return http.post(apis.keyCollarReturnSave, params)
}

export function releaseGetData1(params = {}) {
    return http.post(apis.releaseGetData1, params)
}

export function releaseSave(params = {}) {
    return http.post(apis.releaseSave, params)
}

export function imageDownList(params = {}) {
    return http.get(apis.imageDownList, params)
}

export function imageDown(params = {}) {
    return http.post(apis.imageDown, params)
}

export function imageDownAll(params = {}) {
    return http.post(apis.imageDownAll, params)
}

export function saveHouseInquest(params = {}) {
    return http.post(apis.saveHouseInquest, params)
}

export function saveCarInquest(params = {}) {
    return http.post(apis.saveCarInquest, params)
}

export function saveLandInquest(params = {}) {
    return http.post(apis.saveLandInquest, params)
}

export function assetBookList(params = {}) {
    return http.post(apis.assetBookList, params)
}

export function getQrcode(params = {}) {
    return http.post(apis.getQrcode, params)
}

export function courtList(params = {}) {
    return http.post(apis.courtList, params)
}

export function courtHistoryList(params = {}) {
    return http.post(apis.courtHistoryList, params)
}

