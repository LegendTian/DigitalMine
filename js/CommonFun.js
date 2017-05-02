// 公用函数集           author: wyh               20110106

/*
*   GetRequest获取url中的传递的参数
*   var or=GetRequest();
*   or["param1"]  返回参数名为param1的值
*/
function GetRequest()
{
   var url=window.location.search;    //获取url中"?"符号后的字串，含"?"
   var theRequest=new Object();
   if(url.indexOf('?')>-1)
    {
      var tempstr=url.substr(1);
      var tempstr_array=tempstr.split('&');
       for(var i=0;i<tempstr_array.length;i++)
       {
           var str=tempstr_array[i].split('='); 
           theRequest[str[0]]=decodeURI(str[1]);  //解码结果 
       }
      return theRequest;     
    }  
};
/*
* 获取地图的范围
*param:  c=minx,miny,maxx,maxy*zoomleves
*return   zoomleves=[minx,miny,maxx,maxy]
*/
function getAMapExtent(c)
{
      var rel=new Array(); 
      var ca=c.split(',');
      var minx=parseFloat(ca[0]);
      var miny=parseFloat(ca[1]);
      var maxx=parseFloat(ca[2]);
      var maxy=parseFloat(ca[3]); 

      rel.push(minx);
      rel.push(miny);
      rel.push(maxx);
      rel.push(maxy);
      return rel;     
};
/*
* 获取地图的分辨率
*param: c=minx,miny,maxx,maxy*zoomleves
*param: z= zoomleves
*return  r=[r1,r2,r3...,rn]
*/
function getAResolutions(c,z)
{
      var rel=new Array(); 
      var b=getAMapExtent(c);
      var w=b[2]-b[0];
      var h=b[3]-b[1]; 
      var r; 
      if(w>=h) 
      {
           r=w/256;
      }
      else 
      {
           r=h/256;
      }
      rel.push(r); 
      for(var i=1; i<z;i++)
      {
           r=r/2; 
           rel.push(r);
      }  
     return rel;        
} ;
/*
* 获取地图的比例尺
*param: c=[r1,r2,r3...,rn]
*return  r=[s1,s2,s3...,sn]
*/
function getAScale(ra)
{
    var sa=[];
    for(var i=0;i<ra.length;i++)
    {
        var s= ra[i] * OpenLayers.INCHES_PER_UNIT["m"] * OpenLayers.DOTS_PER_INCH; 
        sa.push(s);
    } 
    return sa;  
}
/*
*浮动矿中超链接弹出窗口处理模式
*id--编号(可能是煤矿编号，分站编号，也可能是传感器编号)
*/
 function  openSingleMine(id,flag,sys)
{
     
      if(id==""||id=="undefined"||id==null)return;
      switch(flag)
      {
        case "mine":
               fun_mine(id,sys);
        break;
        case "station":
                fun_station(id);
        break;
        case "transducer":
                fun_transducer(id);
        break;
      }  
 };//end openSingleMine
/*
* 单矿窗口
* id,煤矿编号
* sys系统类型
*/
 function fun_mine1111(id, sys)
 {
     

     var urlstr ='';
     if (id == "14072300015") {
         //urlstr = 'http://192.168.111.46:8011/index1.jsp';
     }
     else if (mineid == "14072300017") {
         //urlstr = 'http://192.168.111.46:8011/index1.jsp';
     }
     else if (mineid == "14072300024") {
         //urlstr = 'http://192.168.111.46:8011/index1.jsp';
     }
     var wtop = 0;       //获得窗口的垂直位置;
     var wleft = 0;           //获得窗口的水平位置;
     var sfeature = 'left=' + wleft + ',top=' + wtop + ',height=' + window.screen.availHeight + ',width=' + window.screen.availWidth + ',titlebar=0,scrollbars=0,status=0,toolbar=0';
     window.open(urlstr, '', sfeature);


 }


function fun_mine(id,sys)
{
     if(sys==""||sys=="undefined"||sys==null)return;
     var themegis="no";  //是否含有专题gis下拉列表框
     if(sys=="pg")themegis="pg";
     else if(sys=="gas")themegis="gas";
     
     var rq= OpenLayers.Request.GET         //请求是否上传矿图(必须采用同步)
                      ({
                                             url:"../json/checkIsHaveMine.aspx?mineid="+id+"&rnd="+Math.random(),
                                             async:false
                      }); 
      var rel=rq.responseText; 
      if(rel!="1")Ext.Msg.alert('提示', '该矿未上传矿图！'); 
      else    //进入单矿图形界面
      { 
              var winMine=new Ext.Window
              ({
                        id:"winMine",
                        title:"单矿图形监控",
                        iconCls:"win_header", 
                        x:0,
                        y:0,
                        shim:false,
                        resizable :false,
                        draggable :false,
                        modal:'true', 
                        allowDomMove :true,
                        closable:true,
                        closeAction:'close',
                        layout: "fit", 
                        html:"<iframe  id='mapFrame'  width='100%' height='100%' scrolling='no' frameborder='0' src='singlemap.aspx?mineid="+id+"&systype="+sys+"&legendHeader=no&themegis="+themegis+"&rnd="+Math.random()+"' ></iframe>"
              });
              winMine.show();
              winMine.setPosition(0,0);            
              winMine.maximize();   
      }
};//end-mine
/*
* 人员分站浮动矿弹出分站人员列表
* param id     stationid
* param sys   系统类型
* return   人员分站列表
*/
function fun_station(id)
{
     var  url="stationpeoplelist.aspx?STATIONID="+id+"&rnd="+Math.random();
     window.showModalDialog(url,"人员列表", "dialogWidth=500px;dialogHeight=370px;status=no;scroll=no");   
};
/*安全传感器曲线弹出窗口
* param id =*M011405220000044446666666666
* return 弹出安全曲线窗口 
*/ 
function fun_transducer(id)
{
     var mydate=new Date();
     var myear=mydate.getFullYear();          //2010
     var mymonth=mydate.getMonth()+1;         //月份-1  如实际是6月，返回值为5
     var myday=mydate.getDate();              //2
     var mytime=mydate.toLocaleTimeString();  //15:34:02
     var myhour=mydate.getHours();              
     var myminute=mydate.getMinutes();
     var mysecond=mydate.getSeconds();
     var EndTime =myear+'-'+mymonth+'-'+myday+' '+myhour+':'+myminute+':'+mysecond;  //当前时间
     var ohour=myhour-1;
     
     var monitor_types=id.substr(1,3);
     var qlstr1=monitor_types.substr(0,1)+id.substr(4);//曲线参数
     var qlstr2=monitor_types+id.substr(4);//风扇参数
     
     var StartTime =myear+'-'+mymonth+'-'+myday+' '+ohour+':'+myminute+':'+mysecond;//当前时间的前一小时         
     var src = "../../../Gas/RealShow/SingleMine/line.aspx?width=700&height=460&transducers=" + qlstr2 + "&coordinate=10&btnshow=true&startTime=" + StartTime + "&endTime=" + EndTime +"&alarmLine=true&rnd="+Math.random();
//     var  winGasLine = new Ext.Window
//             ({   
//                 title:"传感器曲线",   
//                 id : 'winGasLine',   
//                 width :820,   
//                 height:530, 
//                 modal:true,  
//                 maximizable :false,   
//                 closable : true,   
//                 closeAction :  'close'  
//             });   
//    winGasLine.show();
//    winGasLine.load({url:src,params:{x:StartTime},scripts:true});  
       var src2='../../../Gas/RealShow/SingleMine/FusionChartRealDB.aspx?'+"rnd="+Math.random();   
       popupFun("传感器曲线",src,src2,EndTime);   
}
/*
* 处理浮动框内容
* param strResult为浮动框处理结果
* param flag 为请求类型 mine 单矿  station 人员分站 transducer 安全传感器
* param sys为系统类型
*/
function   getFloatWindowContent(strResult,flag,sys) 
{
   if((strResult =="")||(strResult==null)||(strResult==undefined))
   {
       return  "<tr ><td colspan=2  style='width: 200px;padding-left:50px;' align='left'>编号发生变化<br>请及时更新图形标注信息</td></tr>";
   }
   var mineInfo=strResult.split(";");
   var strInfo="";
   var nCount=mineInfo.length;
   if(nCount>0)
   {   
       var singleMineInfo=mineInfo[0].split(":"); //singleMineInfo[0]-煤矿编号，singleMineInfo[1]-煤矿名称
       strInfo+="<tr><td  colspan='2'><table cellpadding='0' cellspacing='0'><tr><td style='width: 200px;height:1px;font-size:16px;font-weight:bolder;border-bottom-style:outset 1px #99BBE8' colspan='2' align='center'></td></tr><tr><td style='width: 200px;height:20px;font-size:14px;font-weight:bolder;border-bottom-style:outset 1px #99BBE8' align='center'><a class='mine' onmouseout='this.style.color=&quot;#0033ff&quot;' onmouseover='this.style.color=&quot;#ff3300&quot;' onclick='openSingleMine(&quot;"+singleMineInfo[0]+"&quot;,&quot;"+flag+"&quot;,&quot;"+sys+"&quot;)' style='cursor: pointer;color:#0033ff; text-decoration:underline;'>"+singleMineInfo[1]+"</a></td></tr><tr><td style='width: 200px;height:2px;font-size:16px;font-weight:bolder;border-bottom-style:outset 1px #99BBE8' colspan='2' align='center'></td></tr></table></td></tr>";
       for(var i=1;i<nCount;i++)
       {
          var singleMineInfo=mineInfo[i].split(":");
          if(singleMineInfo[0].indexOf("****")>-1) //加横线
          {
               var single1=singleMineInfo[0].substr(4);
               strInfo+="<tr><td colspan=2 align='center'   style='width: 200px;'><table width='80%' cellspacing='0' cellpadding='0' border='0' bgcolor='#5d5c5c' height='1'><tr><td ></td></tr></table></td></tr>";
               if(singleMineInfo[1]=="----")     //表示空
               {
                  strInfo+="<tr ><td style='width: 100px;padding-left:20px;' align='left'>"+single1+"</td><td style='width: 100px;'  align='left'></td></tr>";
               }
               else
               {
                  strInfo+="<tr ><td style='width: 100px;padding-left:20px;' align='left'>"+single1+"</td><td style='width: 100px;'  align='left'>"+singleMineInfo[1]+"</td></tr>";
               }
          }
          else        
          {
              if(singleMineInfo[1]=="----")  //主菜单
              {
                   strInfo+="<tr ><td style='width: 100px;padding-left:20px;' align='left'>"+singleMineInfo[0]+"</td><td style='width: 100px;'  align='left'></td></tr>";
              }
              else if(singleMineInfo[1]=="xxxx") //子菜单
              {
                   var str=singleMineInfo[0].match(/\d+/);//找出数字
                   str=singleMineInfo[0].replace(/\d+/,"<span style='color:red'>"+str+"</span>");
                   strInfo+="<tr ><td colspan=2  style='width: 200px;padding-left:50px;' align='left'>"+str+"</td></tr>";
              }
              else
              {
                   strInfo+="<tr ><td style='width: 100px;padding-left:20px;' align='left'>"+singleMineInfo[0]+"</td><td style='width: 100px;'  align='left'>"+singleMineInfo[1]+"</td></tr>";
              }
          }  
       }
    }
    return strInfo;
 };
function AJAXRequest(url,isAjax,method,data,callback,charSet) //isAjax代表的是否是异步，true表异步，false表同步
{
    var xmlHttp,result ;
	if(window.XMLHttpRequest)
		xmlHttp = new XMLHttpRequest() ;
	else if(window.ActiveXObject)  //这是针对微软的IE
		xmlHttp = new ActiveXObject("Microsoft.XMLHTTP") ;	//创建一个xmlHttp对象
	xmlHttp.onreadystatechange = function()	{
		if(xmlHttp.readyState == 4)		{
			if(xmlHttp.status ==200){
				if(xmlHttp.responseXML != null && xmlHttp.responseXML.xml != null && xmlHttp.responseXML.xml != '')
					result = xmlHttp.responseXML ;
				else 
					result = xmlHttp.responseText ;  //接受请求的结果
			    if(isAjax&&typeof(callback)=='function')
				    callback(result);   
			}
			xmlHttp = null;
		}
	}
	if(url.indexOf("?")>0)
		url += "&random =" +Math.random() ;
	else
		url += "?&random =" +Math.random() ;
	xmlHttp.open(method, url, isAjax); //发送请求
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); //这一句很重要，特别是对post方式发送时是必须的
	var charset = charSet?charSet:"gb2312";
	xmlHttp.setRequestHeader("CharSet",charset);
	xmlHttp.send(data); //发送数据
	try{
        if(!isAjax)
	    {
	        var res = result||xmlHttp.responseText||xmlHttp.responseXML;
	        if(typeof(callback)=='function')
	            callback(res);
	        return res;
	    }
	}
	catch(e){};
};
function getPageSize() { //页面大小
    var xScroll, yScroll;
    if (window.innerHeight && window.scrollMaxY) {
        xScroll = document.body.scrollWidth;
        yScroll = window.innerHeight + window.scrollMaxY;
    } else if (document.body.scrollHeight > document.body.offsetHeight) {
        xScroll = document.body.scrollWidth;
        yScroll = document.body.scrollHeight;
    } else {
        xScroll = document.body.offsetWidth;
        yScroll = document.body.offsetHeight;
    }
    var windowWidth, windowHeight;
    if (self.innerHeight) { // all except Explorer
        windowWidth = self.innerWidth;
        windowHeight = self.innerHeight;
    } else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
        windowWidth = document.documentElement.clientWidth;
        windowHeight = document.documentElement.clientHeight;
    } else if (document.body) { // other Explorers
        windowWidth = document.body.clientWidth;
        windowHeight = document.body.clientHeight;
    }
    if (yScroll < windowHeight) {
        pageHeight = windowHeight;
    } else {
        pageHeight = yScroll;
    }
    if (xScroll < windowWidth) {
        pageWidth = windowWidth;
    } else {
        pageWidth = xScroll;
    }
    arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
    return arrayPageSize;
};


/*ajac请求 
url 请求的页面地址
isAjax:true or false
method: "GET","POST"
data:"key1=value1&key2=value2"
*/
function AJAXRequest(url, isAjax, method, data) {

    return $.ajax({
        type: method,
        async: isAjax,
        url: url,
        data: data,
        success: function (data) {
            //return data;
        }
    }).responseText;
};


function MillisecondToDate(msd) {
    var time = parseFloat(msd) / 1000;
    if (null != time && "" != time) {
        if (time > 60 && time < 60 * 60) {
            time = parseInt(time / 60.0) + "分钟" + parseInt((parseFloat(time / 60.0) -
            parseInt(time / 60.0)) * 60) + "秒";
        } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
            time = parseInt(time / 3600.0) + "小时" + parseInt((parseFloat(time / 3600.0) -
            parseInt(time / 3600.0)) * 60) + "分钟" +
            parseInt((parseFloat((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60) -
            parseInt((parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60)) * 60) + "秒";
        } else {
            time = parseInt(time) + "秒";
        }
    } else {
        time = "0 时 0 分0 秒";
    }
    return time;

}

