

var initLocalBaseMap = function (mapdiv, url, resolutions, crs, center, zoom, zoomctrlable) {

    if (resolutions == null)
        resolutions = [
            0.0095178440233211203,
            0.0047589220116605602,
            0.0023794610058302801,
            0.00118973050291514,
            0.00059486525145757002
        ];
    if (crs == null)
        crs = new L.Proj.CRS("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs",
        {
            origin: [-400, 400],
            resolutions: resolutions
        });
    var mapOptions = {
        crs: crs,
        attributionControl: false,
        continuousWorld: true,
        worldCopyJump: false, 
        zoomControl: zoomctrlable == 0 ? zoomctrlable : true 
    };
    var map = L.map(mapdiv, mapOptions);

    if (center == null)
        center = [37.6, 112.543];
    if (zoom == null)
        zoom = 0;
    map.setView(center, zoom);
    if (zoomctrlable != 0) {
        map.zoomControl.options.zoomInTitle = '放大';
        map.zoomControl.options.zoomOutTitle = '缩小';
    }
    

    var china_dt = new L.TileLayer.TileLoadArcgisCache(url, {
        noWrap: true,
        continuousWorld: true
    });
    map.addLayer(china_dt);

    return map;
}

var initMineMap= function (mapdiv, url,extent,tile_z, crs, center, zoom, zoomctrlable) {
    console.log(mapdiv, url,extent,tile_z, crs, center, zoom, zoomctrlable);
    var resolutions =new Array();
    if (extent.length==4){
        var rel=new Array();

        var w=extent[2]-extent[0];
        var h=extent[3]-extent[1];
        var r;
        if(w>=h)
        {
            r=w/256;
        }
        else
        {
            r=h/256;
        }
        resolutions.push(r);
        for(var i=1; i<tile_z;i++)
        {
            r=r/2;
            resolutions.push(r);
        }

    }


    var crs = new L.Proj.CRS("EPSG:4326", "+proj=longlat +ellps=WGS84 +datum=WGS84 +units=m +no_defs",
            {
                origin: [extent[0], extent[3]],
                resolutions: resolutions
            });
    var mapOptions = {
        crs: crs,
        attributionControl: false,
        continuousWorld: true,
        worldCopyJump: false,
        zoomControl: zoomctrlable == 0 ? zoomctrlable : true
    };
    console.log("mapOptions",mapOptions);
    var map = L.map(mapdiv, mapOptions);


    map.fitBounds([
        [extent[1], extent[0]],
        [extent[3], extent[2]]
    ]);
    if (center == null)
        center = [37.6, 112.543];
    if (zoom == null)
        zoom = 0;
    map.setView(center, zoom);
    if (zoomctrlable != 0) {
        map.zoomControl.options.zoomInTitle = '放大';
        map.zoomControl.options.zoomOutTitle = '缩小';
    }


    var mine_map = new L.TileLayer.TileLoadArcgisCache(url, {
        noWrap: true,
        continuousWorld: true
    });
    map.addLayer(mine_map);

    return map;
}
var initNetBaseMap = function (mapdiv, zoomctrlable) {
    console.log("zoomctrlable", zoomctrlable);
    var map = L.map(mapdiv, { attributionControl: false, zoomControl: zoomctrlable==0?zoomctrlable:true });
    map.setView([37.6, 112.543], 7);
    map.zoomControl.options.zoomInTitle = '放大';
    map.zoomControl.options.zoomOutTitle = '缩小';
    var classFunc = L.TileLayer.CanvasTMS;
    var layerChoices = {
        Stamen: {

            Terrain: {
                thumbnail: 'http://a.tile.stamen.com/terrain/12/655/1583.png',
                getLayer: function (classFunction) {
                    return new classFunction('http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.png', {
                        detectRetina: true
                    });
                }
            },
            Watercolor: {
                thumbnail: 'http://a.tile.stamen.com/watercolor/12/655/1583.png',
                getLayer: function (classFunction) {
                    return new classFunction('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> ',
                        detectRetina: true
                    });
                }
            }
        },
        OSM: {
            Default: {
                thumbnail: 'http://a.tile.openstreetmap.org/12/655/1583.png',
                getLayer: function (classFunction) {
                    return new classFunction('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        detectRetina: true
                    });
                }
            }
        },
        CartoDB: {
            Positron: {
                thumbnail: 'http://a.basemaps.cartocdn.com/light_all/12/655/1583.png',
                getLayer: function (classFunction) {
                    return new classFunction('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                        detectRetina: true
                    });
                }
            },
            'Dark Matter': {
                thumbnail: 'http://a.basemaps.cartocdn.com/dark_all/12/655/1583.png',
                getLayer: function (classFunction) {
                    return new classFunction('http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>',
                        detectRetina: true
                    });
                }
            }
        }
    };

    // Store the currently selected filters
    var selectedCSSFilter = L.ImageFilters.Presets.CSS.Invert80;
    var selectedChannelFilter = L.ImageFilters.Presets.CanvasChannel.HueRotate30;
    var selectedFilter;
    var baseLayer = layerChoices.OSM.Default.getLayer(classFunc);

    var getFilter = function () {

        selectedFilter = function (element, image, ctx) {
            new L.CanvasFilter({
                channelFilter: selectedChannelFilter
            }).render(element, image, ctx);
        };

        baseLayer.setFilter(selectedChannelFilter);
        baseLayer.setCSSFilter(selectedCSSFilter);
    };

    getFilter();
    map.addLayer(baseLayer);
    return map;
}

var addSXPolygon = function(mapdiv){
    $.getJSON('../data/sx_poly.json', function (json) {
        sxPolyLayer = L.geoJson(json, {
            id: 'sxPoly',
            style: function (feature) {
                return { weight:2 };
            }
        }).addTo(mapdiv);
        //mapdiv.fitBounds(sxPolyLayer.getBounds());
        //mapdiv.setMaxBounds(sxPolyLayer.getBounds());
        mapdiv.setMinZoom(3);
        return sxPolyLayer;
    })
}

function addFZSPoint() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: '../data/MKFS.CapacityAndLevel.aspx?ticket=' + ticket,
        error: function () {
            alert('No se pudieron cargar los datos');
        },
        success: function (result) {
            $.each(mine_points.features, function (i, data) {
                $.each(result, function (j, row) {
                    if (mine_points.features[i].properties.orgcode == row.OrgCode) {
                        var v = row.HydrologyType;
                        var r = row.ApprovedProductionCapacity;

                        marker = L.marker(new L.LatLng(mine_points.features[i].geometry.coordinates[1], mine_points.features[i].geometry.coordinates[0]), {
                            icon: getIcon(v, r),
                            title: mine_points.features[i].properties.orgname,
                            opacity: 1,
                            code: mine_points.features[i].properties.orgcode,
                            type: v,
                            capacity: r,
                            suborgname: row.SubOrgName
                        }).on('click', function (e) {
                            openNextPage(mine_points.features[i].properties);
                        }).addTo(collisionLayer);
                        marker.addTo(allPointsLayer);
                        return false;
                    }
                });
            });
            collisionLayer.addTo(map);

        }
    });
}

function addFZSAlertPoint() {
    $.ajax({
        type: 'GET',
        dataType: 'json',
        url: "../data/MKFS.ExpiredRemindList.aspx?ticket=" + ticket,
        error: function () {
            alert('No se pudieron cargar los datos');
        },
        success: function (result) {
            g("ca_total").innerHTML = result.total;
            var caTableHtml = '';

            $.each(mine_points.features, function (i, data) {
                $.each(result.rows, function (j, row) {
                    if (mine_points.features[i].properties.orgcode == row.MineCode) {
                        var daoqi = (row.ExpiredDays > 0) ? ("已过期 " + row.ExpiredDays + " 天") : ("还有 " + Math.abs(row.ExpiredDays) + " 天到期");
                        caTableHtml += '<tr><td style="cursor: pointer;" onclick="centerToPoint(' + mine_points.features[i].geometry.coordinates[1] + ',' + mine_points.features[i].geometry.coordinates[0]
                                    + ')">' + row.MineName + '</td><td>' + row.ApproveDate.split('T')[0] + '</td><td style="color: #ff4d4f;">' + daoqi + '</td></tr>';

                        //marker = L.marker(new L.LatLng(mine_points.features[i].geometry.coordinates[1], mine_points.features[i].geometry.coordinates[0]), {
                        //    icon: alertIcon,
                        //    title: row.MineName+"\r\n"+daoqi,
                        //    opacity: 1,
                        //    code: mine_points.features[i].properties.orgcode,
                        //    zIndexOffset: 610
                        //}).on('click', function (e) {
                        //    openNextPage(row.MineCode);
                        //}).addTo(map);
                        return false;
                    }
                });
            });
            g("ca_table").innerHTML = caTableHtml;
        }
    });
}

function centerToPoint(x, y) {
    map.setView([x, y], 5);
}

var addSearchControl = function (map, position) {
    var searchControl = new L.Control.Search({
        autoType: false,
        sourceData: function (text, callAfter) {
            var data = {};
            $.ajax({
                type: 'GET',
                dataType: 'json',
                url: '../data/MKFS.CapacityAndLevel.aspx?ticket=' + ticket,
                success: function (result) {
                    $.each(mine_points.features, function (i, fea) {
                        $.each(result, function (j, row) {
                            if (mine_points.features[i].properties.orgcode == row.OrgCode) {
                                data[i] = { title: row.OrgName, loc: [fea.geometry.coordinates[1], fea.geometry.coordinates[0]], code: row.OrgCode};
                            }
                        });
                    });
                    callAfter(data);
                }
            });
            
        }
    });
    if (position != null)
        searchControl.setPosition(position);
    map.addControl(searchControl);
    return searchControl;
}

var createImageControl = function (position, url) {
    var MyControl = L.Control.extend({
        options: {
            position: position
        },
        onAdd: function (map) {
            var img = L.DomUtil.create('img');
            img.src = url;
            //    img.style.width = '200px';
            return img;
        }
    });

    map.addControl(new MyControl());
}

var openNextPage = function (code, url) {
    if (code == null)
        return;
    var url = "../mkfs/MineIndex.aspx?code=" + code + "&ticket=" + ticket;
    window.open(url,'_self');
}


function filterMap(selected) {
    sel = [];
    for (key in selected) {
        if (selected[key])
            sel.push(key);
    }
    filterMapByZoomAndConditions(false);
}

function regionSearch(name) {
    keyname = name;
    filterMapByZoomAndConditions(true);

}

function filterMapByZoomAndConditions(bLocate) {
    collisionLayer.clearLayers();
    var x_min = x_max = y_min = y_max = 0;
    allPointsLayer.eachLayer(function (layer) {
        if (sel.indexOf(layer.options.type) > -1 && !(keyname != "" && layer.options.suborgname != keyname)) {
            layer.setOpacity = 1;
            layer.setIcon(getIcon(layer.options.type, layer.options.capacity));
            if (bLocate && layer._latlng.lat && layer._latlng.lng) {
                if (x_min == 0 && x_max == 0 && y_min == 0 && y_max == 0) {
                    x_min = x_max = layer._latlng.lng;
                    y_min = y_max = layer._latlng.lat;
                }
                x_max = layer._latlng.lng > x_max ? layer._latlng.lng : x_max;
                x_min = layer._latlng.lng < x_min ? layer._latlng.lng : x_min;
                y_max = layer._latlng.lat > y_max ? layer._latlng.lat : y_max;
                y_min = layer._latlng.lat < y_min ? layer._latlng.lat : y_min;
            }

        } else {
            layer.setOpacity = 0;
            layer.setIcon(hideIcon);
        }
        layer.addTo(collisionLayer);
    });
    if (bLocate) {
        console.log('fly', y_min, x_min, y_max, x_max);
        map.flyToBounds([[y_min, x_min], [y_max, x_max]]);
    }
}

function toWKT(layer) {
    var lng, lat, coords = [];
    if (layer instanceof L.Polygon || layer instanceof L.Polyline) {
        var latlngs = layer.getLatLngs()[0];
        console.log(latlngs);
        for (var i = 0; i < latlngs.length; i++) {
            latlngs[i]
            coords.push(latlngs[i].lng + " " + latlngs[i].lat);
            if (i === 0) {
                lng = latlngs[i].lng;
                lat = latlngs[i].lat;
            }
        };
        if (layer instanceof L.Polygon) {
            return "POLYGON((" + coords.join(",") + "," + lng + " " + lat + "))";
        } else if (layer instanceof L.Polyline) {
            return "LINESTRING(" + coords.join(",") + ")";
        }
    } else if (layer instanceof L.Marker) {
        return "POINT(" + layer.getLatLng().lng + " " + layer.getLatLng().lat + ")";
    }

    function locateWXYDuePoint() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "../data/MKWXY.RecordDueInfo.aspx?ticket=" + ticket,
            error: function () {
                //   alert('No se pudieron cargar los datos');
            },
            success: function (result) {
                g("ca_total").innerHTML = result.total;
                var caTableHtml = '';

                $.each(mine_points.features, function (i, data) {
                    $.each(result.rows, function (j, row) {
                        if (mine_points.features[i].properties.orgcode == row.Code) {
                            caTableHtml += '<tr><td style="cursor: pointer;" onclick="centerToPoint(' + mine_points.features[i].geometry.coordinates[1] + ',' + mine_points.features[i].geometry.coordinates[0]
                                        + ')">' + row.Name + '</td><td>' + row.RegDate.split('T')[0] + '</td><td style="color: #ff4d4f;">' + row.CompareDate + '</td></tr>';


                            return false;
                        }
                    });
                });
                g("ca_table").innerHTML = caTableHtml;
            }
        });
    }


    function locateWXYNonePoint() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            url: "../data/MKWXY.NoRecordInfo.aspx?ticket=" + ticket,
            error: function () {
                //   alert('No se pudieron cargar los datos');
            },
            success: function (result) {
                g("ts_total").innerHTML = result.total;
                var caTableHtml = '';

                $.each(mine_points.features, function (i, data) {
                    $.each(result.rows, function (j, row) {
                        if (mine_points.features[i].properties.orgcode == row.MineCode) {
                            caTableHtml += '<tr><td style="cursor: pointer;" onclick="centerToPoint(' + mine_points.features[i].geometry.coordinates[1] + ',' + mine_points.features[i].geometry.coordinates[0]
                                        + ')">' + row.MineName + '</td><td>' + row.MineStateName + '</td></tr>';


                            return false;
                        }
                    });
                });
                g("ts_table").innerHTML = caTableHtml;
            }
        });
    }
}