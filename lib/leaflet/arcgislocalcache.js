/** 
 * ���ر���arcgis��Ƭ�� 
 *  
 * @author wyh 
 * @date 2016-11-01 
 * @copyright (jykj)  
 */  
  
/** 
 * �̳���TileLayer 
 * @param {Object} iis��ӳ��ĵ�ͼurl 
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
 * ��дTileLayer�л�ȡ��Ƭurl���� 
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
 * ��λ��ȫ���� 
 * @param {Object} ���������ַ��� 
 * @param {Object} ��λ�����������λ��0 
 */  
var pad = function(numStr, n) {  
    var len = numStr.length;  
    while(len < n) {  
        numStr = "0" + numStr;  
        len++;    
    }  
    return numStr;  
};  