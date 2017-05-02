/** 
 * 加载本地arcgis切片类 
 *  
 * @author wyh 
 * @date 2016-11-01 
 * @copyright (jykj)  
 */  
  
/** 
 * 继承自TileLayer 
 * @param {Object} iis中映射的地图url 
 * @param {Object} options 
 */  
L.TileLayer.TileLoadArcgisCache = L.TileLayer.extend({  
    initialize: function (url, options) {  
        options = L.setOptions(this, options);  
        this.url = url + "/{z}/{x}/{y}.png";  
        L.TileLayer.prototype.initialize.call(this, this.url, options);  
    }  
});  


/** 
 * 重写TileLayer中获取切片url方法 
 * @param {Object} tilePoint 
 */  
L.TileLayer.prototype.getTileUrl = function(tilePoint) {  
    return L.Util.template(this._url, L.extend({  
        s: this._getSubdomain(tilePoint),  
        z: function() {  
            var value = tilePoint.z.toString(10);  
            return "L" + pad(value, 2);  
        },  
        x: function() {  
            var value = tilePoint.y.toString(16);  
            return "R" + pad(value, 8);  
        },  
        y: function() {  
            var value = tilePoint.x.toString(16);  
            return "C" + pad(value, 8);  
        }  
    }));  
};  
  
L.tileLayer.TileLoadArcgisCache = function(url, options){  
  return new L.TileLayer.TileLoadArcgisCache(url, options);  
};  


/** 
 * 高位补全方法 
 * @param {Object} 数字类型字符串 
 * @param {Object} 总位数，不足则高位补0 
 */  
var pad = function(numStr, n) {  
    var len = numStr.length;  
    while(len < n) {  
        numStr = "0" + numStr;  
        len++;    
    }  
    return numStr;  
};  