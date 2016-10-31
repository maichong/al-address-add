# al-address-add
地址新增和编辑页面，可以接受一个地址item，对其进行修改，或者不传item，直接创建一个item。
### 使用方式
```
//安装npm包
npm install al-address-add --save

//导入page 中的js页面
import AddressAdd from 'al-address-add';

children = {
    addressAdd: new AddressAdd({
      item: '@item',
      onChange: '#handleChange'
    })
  };
  
//导入page中的wxml页面
<component key="addressAdd" name="al-address-add"/>

//导入page中的less文件
@import 'al-address-add';
```
### 接口说明
- item:object 
要修改的地址数据，需要符合alaska-address service的数据结构：
```
 {  
    "id":"580eff833eb5cd0008b5667b",
    "name":"王朝",
    "tel":"13512312312",
    "province":"香港特别行政区",
    "city":"九龙",
    "district":"九龙城区",
    "detail":"五花街新龙大厦1234室",
    "createdAt":"2016-10-25T06:45:24.025Z",
    "often":false
    }
```
- onChange():object
新增或修改事件，点击保存按钮后触发，返回一个Object对象，符合item数据结构。如果返回的item数据中有id属性，说明是修改，如果没有item属性，说明是新增。
示例代码：
```

  async handleChange(item) {
    let method = 'POST';
    let url = '/address/api/address/';
    if (item.id) {
      method = 'PUT';
      url += item.id;
    }
    await api(method, url, item);
  }
```

#### 关于页面和组件间相互传值以及该组件所依赖的基础框架详见[labrador](https://github.com/maichong/labrador);
