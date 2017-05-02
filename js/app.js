/**
 * Created by LegendTian on 2016/3/30.
 */

var scCharts={},ryCharts = {}, bjCharts = {}, gzCharts = {};

var initCharts = function () {
    ryCharts= echarts.init(g("ryChart"));
    bjCharts= echarts.init(g("bjChart"));
    gzCharts= echarts.init(g("gzChart"));
    scCharts=echarts.init(g("score-chart"));

    var lineStyle = {
        normal: {
            width: 1,
            opacity: 0.5
        }
    };

    var scOption = {
        //backgroundColor: '#161627',

        // visualMap: {
        //     show: true,
        //     min: 0,
        //     max: 20,
        //     dimension: 6,
        //     inRange: {
        //         colorLightness: [0.5, 0.8]
        //     }
        // },
        /*title: {
            text: '煤矿安全管理评价指标',
            left: 'center',
            textStyle: {
                color: '#eee'
            }
        },*/

        tooltip: {
            //formatter:'{a}: {c}%<br />'
        },
        radar: {
            indicator: [
                {name: '氧气(O2)', max: 100},
                {name: '甲烷(CH4)', max: 1},
                {name: '二氧化碳(CO2)', max: 5},
                {name: '一氧化碳(CO)', max: 2},
                {name: '一氧化氮(NO)', max: 3},
                {name: '二氧化硫(SO2)', max: 3}
            ],
            radius: 60,
            //shape: 'circle',
            splitNumber: 4,
            name: {
                textStyle: {
                    color: 'rgb(238, 197, 102)'
                }
            },
            splitLine: {
                lineStyle: {
                    color: [
                        'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
                        'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
                        'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
                    ].reverse()
                }
            },
            splitArea: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: 'rgba(238, 197, 102, 0.5)'
                }
            }
        },
        series: [
            {
                name: '煤矿安全指标五要素',
                type: 'radar',
                lineStyle: lineStyle,
                data:  [

                    {
                        value : [91, 0.8, 3.2, 1, 2, 2],
                        name : '监测值'
                    }
                ],
                symbol: 'none',
                itemStyle: {
                    normal: {
                        color: '#F9713C'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.2
                    }
                }
            }
        ]
    };

    var ryOption = {
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 15
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '13%',
            containLabel: true
        },
        yAxis: {
            //name: '单位（%）',
            axisTick: {
                //show: false
            },
            axisLabel: {
                //margin: 10,
                //interval: 5,
                textStyle: {
                    color: '#ccc'
                }
            },
            //设置坐标轴字体颜色和宽度
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    width: 1
                }
            },
            splitLine: { show: false },
            type: 'value'
        },
        xAxis:{
            type: 'category',
            boundaryGap: false,
            splitLine: { //网格线
                show: false,
                lineStyle: {
                    color: ['#b1b1b1'],
                    type: 'dashed'
                }
            },
            axisLabel: {
                //show:false,
                textStyle: {
                    color: '#ccc'
                },
                //inside: true,//刻度标签是否朝内，默认朝外。
                interval: 1,//横轴信息全部显示
                //rotate: 60,//60度角倾斜显示
                //formatter: function (value) {
                //    return value.split("").join("\n"); //横轴信息文字竖直显示
                //}
            },
            zlevel:1,
            //设置坐标轴字体颜色和宽度
            axisLine:{
                lineStyle:{
                    color:'#ccc',
                    width:1
                }
            },
            data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        series: [
            {
                name:'井下人数',
                type:'line',
                /*markPoint: {
                    data: [
                        {name: '周最低', value:this.length-1, xAxis: this.length-1, yAxis: -1.5}
                    ]
                },*/
                data:[8,6,7,8,9,10,11,8,4,5,6,7,14,12,9,8,9,10,11,12,13]
            }
        ]
    };

    var bjOption = {
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 8
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '13%',
            containLabel: true
        },
        yAxis: {
            //name: '单位（%）',
            axisTick: {
                //show: false
            },
            axisLabel: {
                //margin: 10,
                //interval: 5,
                textStyle: {
                    color: '#ccc'
                }
            },
            //设置坐标轴字体颜色和宽度
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    width: 1
                }
            },
            splitLine: { show: false },
            type: 'value'
        },
        xAxis:{
            type: 'category',
            boundaryGap: false,
            splitLine: { //网格线
                show: false,
                lineStyle: {
                    color: ['#b1b1b1'],
                    type: 'dashed'
                }
            },
            axisLabel: {
                //show:false,
                textStyle: {
                    color: '#ccc'
                },
                //inside: true,//刻度标签是否朝内，默认朝外。
                interval: 1,//横轴信息全部显示
                //rotate: 60,//60度角倾斜显示
                //formatter: function (value) {
                //    return value.split("").join("\n"); //横轴信息文字竖直显示
                //}
            },
            zlevel:1,
            //设置坐标轴字体颜色和宽度
            axisLine:{
                lineStyle:{
                    color:'#ccc',
                    width:1
                }
            },
            data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        series: [
            {
                name:'报警数',
                type:'line',
                data:[0,1,2,5,5,3,2,4,5,6,2,5,7,4,3,3,4,2,0]
            }
        ]
    };
    var gzOption = {
        visualMap: {
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 5
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            top: '5%',
            left: '2%',
            right: '2%',
            bottom: '13%',
            containLabel: true
        },
        yAxis: {
            //name: '单位（%）',
            axisTick: {
                //show: false
            },
            axisLabel: {
                //margin: 10,
                //interval: 5,
                textStyle: {
                    color: '#ccc'
                }
            },
            //设置坐标轴字体颜色和宽度
            axisLine: {
                lineStyle: {
                    color: '#ccc',
                    width: 1
                }
            },
            splitLine: { show: false },
            type: 'value'
        },
        xAxis:{
            type: 'category',
            boundaryGap: false,
            splitLine: { //网格线
                show: false,
                lineStyle: {
                    color: ['#b1b1b1'],
                    type: 'dashed'
                }
            },
            axisLabel: {
                //show:false,
                textStyle: {
                    color: '#ccc'
                },
                //inside: true,//刻度标签是否朝内，默认朝外。
                interval: 1,//横轴信息全部显示
                //rotate: 60,//60度角倾斜显示
                //formatter: function (value) {
                //    return value.split("").join("\n"); //横轴信息文字竖直显示
                //}
            },
            zlevel:1,
            //设置坐标轴字体颜色和宽度
            axisLine:{
                lineStyle:{
                    color:'#ccc',
                    width:1
                }
            },
            data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]
        },
        series: [
            {
                name:'故障数',
                type:'line',
                data:[3,4,0,1,3,4,2,5,3,2,0,0,1,1,1,3,1,5,3,2]
            }
        ]
    };

    ryCharts.setOption(ryOption);
    bjCharts.setOption(bjOption);
    gzCharts.setOption(gzOption);
    scCharts.setOption(scOption);
    window.onresize = scOption.resize;

}

var addEntity= function (url,size, x,y,height,h,p,r,eid,title) {
    var position = Cesium.Cartesian3.fromDegrees(+x,+y,+height);

    var heading = Cesium.Math.toRadians(h);

    var pitch = Cesium.Math.toRadians(p);

    var roll = Cesium.Math.toRadians(r);


    var hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    var quaternion = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);

    var entity = this.viewer.entities.add({
        id:eid,
        position : position,
        orientation : quaternion,
        name: title, //点击描上的显示信息
        lat:y,
        lng:x,
        billboard : {
            image : url,
            scaleByDistance : new Cesium.NearFarScalar(1.0e2, 1, 8.0e4, 0.4)
        },
        label : {
            text : title,
            showBackground:true,
            font : '14pt monospace',
            scale:2,
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            fillColor : Cesium.Color.YELLOW,
            outlineColor : Cesium.Color.TRANSPARENT,
            outlineWidth : 1,
            horizontalOrigin : Cesium.HorizontalOrigin.LEFT,
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
            scaleByDistance : new Cesium.NearFarScalar(1.0e2, 0.5, 8.0e4, 0.0),
            pixelOffset : new Cesium.Cartesian2((size-4)/2, -(size-4)/2)
        }
    });
    return entity;
}

var addPicLabel= function (url,size,x,y,height,eid,title) {
    var position = Cesium.Cartesian3.fromDegrees(+x,+y,+height);
    var heightPosition = Cesium.Cartesian3.fromDegrees(+x,+y,100+height);
    var color = Cesium.Color.WHITE;

    var polyline = new Cesium.PolylineGraphics();
    polyline.material = new Cesium.ColorMaterialProperty(color);
    polyline.width = new Cesium.ConstantProperty(1);
    polyline.followSurface = new Cesium.ConstantProperty(false);
    polyline.positions = new Cesium.ConstantProperty([position, heightPosition]);

    var entityPoint = new Cesium.Entity({
        position: position,
        point: {
            pixelSize: 8,
            color: color,
            heightReference: Cesium.HeightReference.NONE
        }
    });
    var image = new Image();
    //image.onload = function () {

        var entity = new Cesium.Entity({
            id: eid,
            name: title,
            lat:y,
            lng:x,
            show: true,
            position: heightPosition,
            billboard: {
                image: url,
                //scaleByDistance : new Cesium.NearFarScalar(1.0e2, 0.5, 8.0e4, 0.0),
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT
            },
            polyline: polyline,
            label: {
                text: title,
                font: '18px Helvetica',
                //font: '20px sans-serif',
                //scaleByDistance : new Cesium.NearFarScalar(1.0e2, 1, 8.0e4, 0.5),
                showBackground: true,
                fillColor: Cesium.Color.BLACK,
                backgroundColor: color,
                verticalOrigin: Cesium.VerticalOrigin.TOP,
                horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
                pixelOffset: new Cesium.Cartesian2(size, 0)
            }
            //,
            //seriesName: seriesName //Custom property to indicate series name
        });
        this.viewer.entities.add(entity);
    //}
    //image.src = url;
    this.viewer.entities.add(entityPoint);

    return entity;
}


var showMap=function(){
    g("leafletContainer").style.display="block";
    g("cesiumContainer").style.display="none";
    //g("logo-title").style.color="#545c62";
    g("top-div").style.display="block";
    g("bottom-div").style.display="none";
}
var hideMap=function(){
    g("leafletContainer").style.display="none";
    g("cesiumContainer").style.display="block";
    //g("logo-title").style.color="#edffff";
    g("top-div").style.display="none";
    g("bottom-div").style.display="block";

}
var toHome=function(){
    ltcs.flyTo(113.0578, 36.0972, 1800.0);
}


var directions=["LT","LB","RT","RB"];
var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];

var locateFile = 'data/SchoolLocation.csv';
var labelEtities=[];
var modelFile='data/SchoolModels.csv';
var Dynastymodels;

var jinlingLocation={
    destination:{
        x:-2619715.788796578,
        y:4746254.6387554975,
        z:3351523.0613494557
    },
    h:6.124102330927387,
    p:-1.0322614723336745,
    r:6.282251354147288
};
var jlNorth={
    destination:{
        x:-2619736.2573994,
        y:4745928.876291855,
        z:3350223.7967137666
    },
    h:6.092433415056829,
    p:-0.2503849858402565,
    r:6.282596130164727
};
var jlHead={
    destination:{
        x:-2619704.4465602385,
        y:4746426.56857993,
        z:3352359.0119190575
    },
    h:5.936611345631026,
    p:-1.4270016974674289,
    r:6.275904796226737
};
var vldiv = false;
var viewListsData=[];//视点列表数据
var flyListsData=[];//飞行列表数据
var distanseListsData=[];//测量列表数据
//控制视点列表显示隐藏
var setViewListVisible=function () {
    var element = document.getElementById("lt-btn-viewer");
    var elementID = document.getElementById("view-lists");
    if (element.title === "显示视点列表") {

        elementID.style.left = "50px";

        elementID.style.visibility = "visible";
        element.title = "关闭视点列表";
        vldiv = true;
    }
    else {

        elementID.style.visibility = "hidden";
        element.title = "显示视点列表";
        vldiv = false;
    }
}

var setDivVisible=function (divId,viewid,title,direction,x,y) {
    var element = document.getElementById(divId);
    var elementID = document.getElementById(viewid);
    if (element.title === "显示"+title) {
        switch (direction){
            case "LT":
                elementID.style.left = x+"px";
                elementID.style.top = y+"px";
                break;
            case "LB":
                elementID.style.left = x+"px";
                elementID.style.bottom = y+"px";
                break;
            case "RT":
                elementID.style.right = x+"px";
                elementID.style.top = y+"px";
                break;
            case "RB":
                elementID.style.right = x+"px";
                elementID.style.bottom = y+"px";
                break;

        }

        elementID.style.visibility = "visible";
        element.title = "关闭"+title;

    }
    else {

        elementID.style.visibility = "hidden";
        element.title = "显示"+title;

    }
}

var initViewList=function(listDate){
    var htmlContent='';
    var i,ii;
    for(i= 0,ii=listDate.length;i<ii;i++){
        htmlContent+='<div id="'+ listDate[i].id+'" class="cesium-button view-listItem" >'+ listDate[i].id+'</div>';

    }
    document.getElementById("view-lists-content").innerHTML=htmlContent;
    $(".view-listItem").click(function(event){
        plistItemClicked(event);
    });

}

//视点列表单击事件
function plistItemClicked(evt){
    console.log(evt);

    var pointID=evt.toElement.id;
    flyToView(pointID);

}

function flyToView(id){
    var count=viewListsData.length;
    for(var i=0;i<count;i++){
        if(id===viewListsData[i].id){
            ltcs.flyToDestAndOri(viewListsData[i]);
        }
    }
}

function flyByRoute(){
    if(flyListsData.length>0){
        var property=ltcs.getFlyRoute(flyListsData);
        ltcs.addFlyEntity(property);
    }
}

var add3DTiles= function () {
    var tileset = ltcs.add3DTiles('/path/to/3d/tileset');
}

var addSchoolModel= function () {

    ltcs.addModel('./data/models/DX.gltf',1,118.8852508390,31.8988190356, 0,0,0,0);

    ltcs.addModel('./data/model-C/bm2.gltf',1,118.892969007800 ,31.911516099700, 0,72,0,0);
    //ltcs.addModel('./data/model-J/bm.gltf',1,118.892969007800 ,31.911516099700, 0,72,0,0);

    ltcs.addModel('./data/model-C/bqst2.gltf',1,118.89602104563,31.909180185167, 0,72,0,0);
    ltcs.addModel('./data/model-C/bq34ssl2.gltf',1,118.8852508390,31.8988190356, 0,0,0,0);
    ltcs.addModel('./data/model-C/bq12ssl2.gltf',1,118.893887604015,31.909889384189, 0,-20,0,0);
    ltcs.addModel('./data/model-C/bq6ssl2.gltf',1,118.895559799068,31.908331205222, 0,-20,0,0);
    ltcs.addModel('./data/model-C/bq5ssl2.gltf',1,118.894828508390,31.910175190356, 0,-20,0,0);
    ltcs.addModel('./data/model-C/678jxl2.gltf',1,118.895723872652,31.904792890584, 0,-20,0,0);
    ltcs.addModel('./data/model-C/345jxl2.gltf',1,118.89449401889,31.904127874771, 0,-20,0,0);
    ltcs.addModel('./data/model-C/2jxl2.gltf',1,118.8852508390,31.8988190356, 0,0,0,0);
    ltcs.addModel('./data/model-C/1jxl2.gltf',1,118.8852508390,31.8988190356, 0,0,0,0);




    /*//ltcs.addModel('./data/all/WYH.gltf',1,118.8852508390,31.8988190356, 0,0,0,0);

    ltcs.addModel('./data/CM/TYG-C.gltf',1,118.8963027308,31.90066926, 0,-19,0,0);
    ltcs.addModel('./data/CM/TSG-C.gltf',1.1,118.8951288,31.90562233, 0,72,0,0);
    ltcs.addModel('./data/CM/XZL-C.gltf',1,118.892950022,31.90378269904, 0,-20,0,0);
    ltcs.addModel('./data/CM/GKL-C.gltf',1,118.892265574979,31.906060605034, 0,-20,0,0);

    var JXL345=ltcs.addModel('./data/CM/345JXL-C.gltf',1,118.89449401889,31.904127874771, 0,-20,0,0);
    var jxl678=ltcs.addModel('./data/CM/678jxl-C.gltf',1,118.895723872652,31.904792890584, 0,-20,0,0);
    var JDCJA=ltcs.addModel('./data/CM/JDCJA-C.gltf',1,118.8912222,31.90682222, 0,72,0,0);
    var JDCJB=ltcs.addModel('./data/CM/JDCJB-C.gltf',1,118.8912222,31.90679855, 0,72,0,0);
    var GCJGCF=ltcs.addModel('./data/CM/GCJGCF-C.gltf',1,118.8912667,31.90682222, 0,72,0,0);

    //var JXL12=ltcs.addModel('./data/CM/12jxl.gltf',1,118.892461181284,31.908906342813, 0,-20,0,0);
    ltcs.addModel('./data/CM/BQST-C.gltf',1,118.89602104563,31.909180185167, 0,72,0,0);
    //var JXL1=ltcs.addModel('./data/CM/JXL2-C.gltf',1,118.892461181284,31.908906342813, 0,-20,0,0);
    var JXL2=ltcs.addModel('./data/CM/JXL2-C.gltf',1,118.8929253878,31.9077883835, 0,-20,0,0);
    var JXL1=ltcs.addModel('./data/CM/JXL1-C.gltf',1,118.892461181284,31.908906342813, 0,-20,0,0);
    ltcs.addModel('./data/CM/JKBG-C.gltf',1,118.894299993421,31.900852722035, 0,0,0,0);

    //ltcs.addModel('./data/CM/JLKJNQ.gltf',1,118.896535318815,31.903118977212, 0,-20,0,0);

    ltcs.addModel('./data/CM/BQ5SSL-C.gltf',1,118.894828508390,31.910175190356, 0,-20,0,0);
    ltcs.addModel('./data/CM/BQ6SSL-C.gltf',1,118.895559799068,31.908331205222, 0,-20,0,0);
    //ltcs.addModel('./data/JLKJXY/BQ12SSL-C.gltf',1,118.893887604015,31.909889384189, 0,-20,0,0);
    ltcs.addModel('./data/CM/BQ12SSL-C.gltf',1,118.894483364153,31.908422679527, 0,-20,0,0);*/




}
var csExtent= function () {

    console.log(this.viewer.canvas.clientWidth , this.viewer.canvas.clientHeight);
    return ltcs.getExtent(0,0,this.viewer.canvas.clientWidth,this.viewer.canvas.clientHeight);
}
var addSchoolLabel= function () {
    Papa.parse(locateFile, {
        download: true,
        complete: function (results) {
            var data = results.data;

            for (var i = 1, _l = data.length - 1; i < _l; i++) {

                var item = data[i];

                if(item[2].substring(0)!=null){

                    var entity=ltcs.addLabel(item[2].substring(0), item[3].substring(0),item[4].substring(0), item[1].substring(0));
                    labelEtities.push(entity);
                }
                //var entity=ltcs.addLabel(item[2].substring(0), item[3].substring(0),item[4].substring(0), item[1].substring(0));
                //labelEtities.push(entity);

            }
        }
    });
}
var initModels= function () {
    Papa.parse(modelFile, {
        download: true,
        complete: function (results) {
            Dynastymodels = results.data;
            console.log("Dynastymodels",Dynastymodels);
        }
    });
}
var showLODModels= function () {
    var ext=csExtent();
    console.log(ext);
    if(ext==null)return;
    for (var i = 1, _l = Dynastymodels.length ; i < _l; i++) {

        var item = Dynastymodels[i];
        console.log(i,item);

        if(item[3]){
            if(ext[0]<item[3].substring(0)&&item[3].substring(0)<ext[2]&&ext[1]<item[4].substring(0)&&item[4].substring(0)<ext[3]){
                var isHave=ltcs.getEntityByID(item[0].substring(0));
                console.log("到底有没有",isHave);
                if(!isHave){
                    var entity=ltcs.addModel(item[1].substring(0), item[2].substring(0),item[3].substring(0), item[4].substring(0),
                        item[5].substring(0), item[6].substring(0),item[7].substring(0), item[8].substring(0), item[0].substring(0));
                    console.log("add",entity);
                }

            }else {

                var isRemove= ltcs.removeEntityByID(item[0].substring(0));
                console.log("remove",item[0].substring(0),isRemove);
            }
        }

    }
}
var showNBModels= function () {
    var ext=csExtent();
    console.log("csExtent",ext);
    if(ext==null)return;
    var height=ltcs.getSceneHeight();
    console.log("height",height);
    var center=ltcs.getCenterViewer();
    console.log("CenterViewer",ltcs.getCenterViewer());
    ltcs.addLabel(center[0],center[1],20,"中心点");
    for (var i = 1, _l = Dynastymodels.length ; i < _l; i++) {

        var item = Dynastymodels[i];
        console.log(i,item);

        if(item[3] && item[4] && height<1400){
            if(center[1]-31.90562233>0){
                var isHave=ltcs.getEntityByID(item[0].substring(0));
                console.log("到底有没有",isHave);
                if(!isHave&&item[9].substring(0)=="B"){
                    var entity=ltcs.addModel(item[1].substring(0), item[2].substring(0),item[3].substring(0), item[4].substring(0),
                        item[5].substring(0), item[6].substring(0),item[7].substring(0), item[8].substring(0), item[0].substring(0));
                    console.log("add",entity);
                }else {
                    if(item[9].substring(0)=="N"){
                        var isRemove= ltcs.removeEntityByID(item[0].substring(0));
                        console.log("remove",item[0].substring(0),isRemove);
                    }
                }
            }
            else {
                var isHave=ltcs.getEntityByID(item[0].substring(0));
                console.log("到底有没有",isHave);
                if(!isHave&&item[9].substring(0)=="N"){
                    var entity=ltcs.addModel(item[1].substring(0), item[2].substring(0),item[3].substring(0), item[4].substring(0),
                        item[5].substring(0), item[6].substring(0),item[7].substring(0), item[8].substring(0), item[0].substring(0));
                    console.log("add",entity);
                }else {
                    if(item[9].substring(0)=="B"){
                        var isRemove= ltcs.removeEntityByID(item[0].substring(0));
                        console.log("remove",item[0].substring(0),isRemove);
                    }
                }
            }
        }

    }
}

var showDistanseResult= function () {
    console.log("distanseListsData",distanseListsData);
    var zz=Math.abs(distanseListsData[0].z-distanseListsData[1].z);
    var xx=Math.abs(distanseListsData[0].x-distanseListsData[1].x);
    var yy=Math.abs(distanseListsData[0].y-distanseListsData[1].y);
    var distanse=Math.sqrt(xx*xx + yy*yy + zz*zz);
    console.log(xx,yy,zz);
    console.log("distanse",distanse);

    var solidity=xx*yy*zz;

    distanseListsData=[];
}
