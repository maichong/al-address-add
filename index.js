/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-10-25
 * @author li <li@maichong.it>
 */

import wx from 'labrador';
import immutable from 'seamless-immutable';
import cities from './utils/cities';

const { object, func } = wx.PropTypes;

export default class AddressAdd extends wx.Component {
  propTypes = {
    item: object,
    onChange: func
  };

  data = {
    id: '',
    name: '',
    tel: '',
    province: [],
    provinceIndex: 0,
    city: [],
    cityIndex: 0,
    district: [],
    districtIndex: 0,
    toastHidden: true,
    toastText: '',
    detail: '',
    often: false
  };
  
  handleNameChange(e) {
    this.setData({ name: e.detail.value });
  }

  handleTelChange(e) {
    this.setData({ tel: e.detail.value });
  }

  handleProvinceChange(e) {
    let pidx = parseInt(e.detail.value) || 0;
    this.getList(pidx, 0);
  }

  handleCityChange(e) {
    let cidx = parseInt(e.detail.value) || 0;
    this.getList(this.data.provinceIndex, cidx);
  }

  handleDistrictChange(e) {
    this.setData({ districtIndex: parseInt(e.detail.value) });
  }

  handleDetailChange(e) {
    this.setData({ detail: e.detail.value });
  }

  handleDefaultTap() {
    this.setData({ often: !this.data.often });
  }

  handleSaveTap() {
    let item = {};
    let toastText = '';
    let toastHidden = false;
    let exp = /^1[34567890]{1}[0-9]{9}$/g;
    if (!this.data.name || this.data.name.length <= 0) {
      toastText = '姓名不能为空';
    } else if (!exp.test(this.data.tel)) {
      toastText = '手机号格式不正确';
    } else if (!this.data.detail || this.data.detail.length <= 0) {
      toastText = '详细地址不能为空';
    } else {
      toastHidden = true;
      toastText = '';
      item.name = this.data.name;
      item.tel = this.data.tel;
      item.province = this.data.province[this.data.provinceIndex];
      item.city = this.data.city[this.data.cityIndex];
      item.district = this.data.district[this.data.districtIndex];
      item.detail = this.data.detail;
      item.often = this.data.often;
      if (this.data.id) {
        item.id = this.data.id;
      }
      this.props.onChange(item);
    }
    this.setData({ toastHidden, toastText });
  }

  handleToast() {
    this.setData({ toastHidden: true });
  }

  onLoad() {
    this.getList(0, 0);
  }

  onReady() {

  }

  onShow() {

  }

  onHide() {

  }

  onUnload() {

  }

  getList(pidx, cidx) {
    let province = Object.keys(cities);
    let city = Object.keys(cities[province[pidx]]);
    let district = cities[province[pidx]][city[cidx]];
    this.setData({
      province,
      city,
      district,
      provinceIndex: pidx,
      cityIndex: cidx,
      districtIndex: 0
    });
  }

  onUpdate(props) {
    let me = this;
    let item = props.item || {};
    let provinceIndex = 0;
    let cityIndex = 0;
    let districtIndex = 0;
    if (item.province) {
      this.data.province.forEach((temp, idx) => {
        if (item.province === temp) {
          provinceIndex = idx;
          me.getList(provinceIndex, cityIndex);
        }
      });
      this.data.city.forEach((temp, idx) => {
        if (item.city === temp) {
          cityIndex = idx;
          me.getList(provinceIndex, cityIndex);
        }
      });
      this.data.district.forEach((temp, idx) => {
        if (item.district === temp) {
          districtIndex = idx;
        }
      });
    }
    this.setData({
      id: immutable(item.id) || '',
      name: item.name || '',
      tel: item.tel || '',
      detail: item.detail || '',
      often: item.often || false,
      provinceIndex,
      cityIndex,
      districtIndex
    });
  }
}
