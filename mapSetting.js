//基礎レイヤ追加
var map = L.map('map').setView([36.648735,138.19494], 18);
var removeMarkers = [];
L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
    attribution: '国土地理院'
}).addTo(map);

//フリーWi-Fi追加(初期値：表示)
var kmlLayer_wf = omnivore.kml('./PlaceData/Free Wi-Fi.kml').on('ready', function() {
    //map.fitBounds(kmlLayer_wf.getBounds()); // KMLの範囲にズーム
    kmlLayer_wf.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'FreeWiFi') { //災害ベンダー
            layer.setIcon(Icon_WiFi);
        }
        else {
            layer.setIcon(Icon_Error); //エラー表示
        }

        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
        }
    });
}).addTo(map);


//災害ベンダー追加(初期値：表示)
var kmlLayer_dv = omnivore.kml('./PlaceData/DisasterVendor.kml').on('ready', function() {
    //map.fitBounds(kmlLayer_dv.getBounds()); // KMLの範囲にズーム
    kmlLayer_dv.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'Vendor') { //災害ベンダー
            layer.setIcon(Icon_Vendor);
        }
        else {
            layer.setIcon(Icon_Error); //エラー表示
        }

        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
        }
    });
}).addTo(map);

// マーカー管理用リスト
var wideMarkers = []; // 広域避難場所のすべてのマーカー
var designatedMarkers = []; // 指定避難所のマーカー（広域避難場所のサブセット）
var kmlLayer_ew = omnivore.kml('./PlaceData/WideAreaEvacuationSite.kml').on('ready', function () {
    kmlLayer_ew.eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            var category = feature.properties['category'];

            // カテゴリに応じたアイコン設定
            if (category === 'Evacuation_Wide') {
                layer.setIcon(Icon_Evacuation_Wide);
            } else {
                layer.setIcon(Icon_Error);
            }

            // ポップアップ設定
            layer.bindPopup(layer.feature.properties.description);

            // 広域避難場所リストに追加
            wideMarkers.push(layer);

            // 指定避難所かどうかの判定
            if (feature.properties['指定避難所'] === '○') {
                designatedMarkers.push(layer);
            }
        }
    });
}).addTo(map); // 初期表示

//指定緊急避難場所追加(初期値：表示)
var kmlLayer_de = omnivore.kml('./PlaceData/DesignatedEmergencyEvacuationSite.kml').on('ready', function() {
    map.fitBounds(kmlLayer_wf.getBounds()); //KMLの範囲にズーム
    kmlLayer_de.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'Evacuation_Designated') {
        layer.setIcon(Icon_Evacuation_Designated); // 指定緊急避難場所
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//薬局・ドラッグストア(初期値：表示)
var kmlLayer_ds = omnivore.kml('./PlaceData/DrugStore.kml').on('ready', function() {
    kmlLayer_ds.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'DrugStore') {
        layer.setIcon(Icon_DrugStore); // 指定緊急避難場所
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//コインランドリー(初期値：表示)
var kmlLayer_cl = omnivore.kml('PlaceData/Laundry.kml').on('ready', function() {
    kmlLayer_cl.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'Laundry') {
        layer.setIcon(Icon_Laundry); // 指定緊急避難場所
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//入浴施設(初期値：表示)
var kmlLayer_hs = omnivore.kml('./PlaceData/HotSpring.kml').on('ready', function() {
    kmlLayer_hs.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'HotSpring') {
        layer.setIcon(Icon_HotSpring); // 指定緊急避難場所
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//公衆トイレ(初期値：表示)
var kmlLayer_pt = omnivore.kml('./PlaceData/PublicToilet.kml').on('ready', function() {
    kmlLayer_pt.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'PublicToilet') {
        layer.setIcon(Icon_PublicToilet); //公衆トイレ
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//公衆電話(初期値：表示)
var kmlLayer_pp = omnivore.kml('./PlaceData/PublicPhone.kml').on('ready', function() {
    kmlLayer_pp.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'PublicPhone') {
        layer.setIcon(Icon_PublicPhone); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//セブンイレブン(初期値：表示)
    var kmlLayer_cs_se = omnivore.kml('./PlaceData/ConvenienceStore_SevenEleven.kml').on('ready', function() {
    kmlLayer_cs_se.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'ConvenienceStore_SevenEleven') {
        layer.setIcon(Icon_ConvenienceStore_SevenEleven); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//ファミマ(初期値：表示)
var kmlLayer_cs_fm = omnivore.kml('./PlaceData/ConvenienceStore_FamilyMart.kml').on('ready', function() {
    kmlLayer_cs_fm.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'ConvenienceStore_FamilyMart') {
        layer.setIcon(Icon_ConvenienceStore_FamilyMart); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//ローソン(初期値：表示)
var kmlLayer_cs_l = omnivore.kml('./PlaceData/ConvenienceStore_Lawson.kml').on('ready', function() {
    kmlLayer_cs_l.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'ConvenienceStore_Lawson') {
        layer.setIcon(Icon_ConvenienceStore_Lawson); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//auショップ(初期値：表示)
var kmlLayer_ps_au = omnivore.kml('./PlaceData/PhoneShop_au.kml').on('ready', function() {
    kmlLayer_ps_au.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'PhoneShop_au') {
        layer.setIcon(Icon_PhoneShop_au); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//docomo(初期値：表示)
var kmlLayer_ps_dcm = omnivore.kml('./PlaceData/PhoneShop_docomo.kml').on('ready', function() {
    kmlLayer_ps_dcm.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'PhoneShop_docomo') {
        layer.setIcon(Icon_PhoneShop_docomo); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//softbank(初期値：表示)
var kmlLayer_ps_sb = omnivore.kml('./PlaceData/PhoneShop_softbank.kml').on('ready', function() {
    kmlLayer_ps_sb.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
        var feature = layer.feature; // GeoJSON feature
        // ExtendedData内のcategory属性を取得
        var category = feature.properties['category'];
        if (category === 'PhoneShop_softbank') {
        layer.setIcon(Icon_PhoneShop_softbank); //公衆電話
        }
        else {
        layer.setIcon(Icon_Error); //エラー表示
        }
        // layerに対してポップアップを設定
        layer.bindPopup(layer.feature.properties.description);
    }
    });
}).addTo(map);

//洪水レイヤ
var Layer_flood = L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png', {
    opacity: 0.5
}).addTo(map);

//土砂災害レイヤ
var Layer_DebrisFlow = L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/20/{z}/{x}/{y}.png', {
    opacity: 0.5
}).addTo(map);

//アイコンの設定
//フリーWi-Fi
var Icon_WiFi = L.icon({
    iconUrl: './Icon/FreeWi-Fi.png',
    iconRetinaUrl: './Icon/FreeWi-Fi.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//災害ベンダー
var Icon_Vendor = L.icon({
    iconUrl: './Icon/Disaster Vendor.png',
    iconRetinaUrl: './Icon/Disaster Vendor.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//広域避難場所
var Icon_Evacuation_Wide = L.icon({
    iconUrl: './Icon/Wide area evacuation site.png',
    iconRetinaUrl: './Icon/Wide area evacuation site.png',
    iconSize: [30,30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//指定緊急避難場所
var Icon_Evacuation_Designated = L.icon({
    iconUrl: './Icon/Designated emergency evacuation site.png',
    iconRetinaUrl: './Icon/Designated emergency evacuation site.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//薬局・ドラッグストア
var Icon_DrugStore = L.icon({
    iconUrl: './Icon/drug store.png',
    iconRetinaUrl: './Icon/drug store.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//コインランドリー
var Icon_Laundry = L.icon({
    iconUrl: './Icon/coinraundry.png',
    iconRetinaUrl: './Icon/coinraundry.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//入浴施設
var Icon_HotSpring = L.icon({
    iconUrl: './Icon/hot spring.png',
    iconRetinaUrl: './Icon/hot spring.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//公衆トイレ
var Icon_PublicToilet= L.icon({
    iconUrl: './Icon/restroom.png',
    iconRetinaUrl: './Icon/restroom.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//公衆電話
var Icon_PublicPhone = L.icon({
    iconUrl: './Icon/phone.png',
    iconRetinaUrl: './Icon/phone.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//セブンイレブン
var Icon_ConvenienceStore_SevenEleven = L.icon({
    iconUrl: './Icon/convenience.png',
    iconRetinaUrl: './Icon/convenience.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//ファミリーマート
var Icon_ConvenienceStore_FamilyMart = L.icon({
    iconUrl: './Icon/FamilyMart.png',
    iconRetinaUrl: './Icon/FamilyMart.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//ローソン
var Icon_ConvenienceStore_Lawson = L.icon({
    iconUrl: './Icon/LAWSON.png',
    iconRetinaUrl: './Icon/LAWSON.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//auショップ
    var Icon_PhoneShop_au = L.icon({
    iconUrl: './Icon/au.png',
    iconRetinaUrl: './Icon/au.png',
    iconSize: [50, 30],
    iconAnchor: [25, 10],
    popupAnchor: [15, -20]
});
//docomo
var Icon_PhoneShop_docomo = L.icon({
    iconUrl: './Icon/docomo.png',
    iconRetinaUrl: './Icon/docomo.png',
    iconSize: [50, 30],
    iconAnchor: [25, 10],
    popupAnchor: [15, -20]
});
//softbank
var Icon_PhoneShop_softbank = L.icon({
    iconUrl: './Icon/softbank.png',
    iconRetinaUrl: './Icon/softbank.png',
    iconSize: [50, 7],
    iconAnchor: [25, 4],
    popupAnchor: [20, -3]
});


//テスト用アイコンデータ
var Icon_Test = L.icon({
    iconUrl: './Icon/Test.png',
    iconRetinaUrl: './Icon/Test.png',
    iconSize: [30, 30],
    iconAnchor: [15, 10],
    popupAnchor: [0, -20]
});
//エラー表示用アイコン
var Icon_Error= L.icon({
    iconUrl: './Icon/Error.png',
    iconRetinaUrl: './Icon/Error.png',
    iconSize: [100, 100],
    iconAnchor: [50, 40],
    popupAnchor: [0, -60]
});


function Check(){    
    //フリーWi-Fi
    if (document.icon_select_point.WiFi.checked && !kmlLayer_wf) { 
    kmlLayer_wf = omnivore.kml('./PlaceData/Free Wi-Fi.kml').on('ready', function() {
        kmlLayer_wf.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'FreeWiFi') { //災害ベンダー
            layer.setIcon(Icon_WiFi);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.WiFi.checked && kmlLayer_wf) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_wf);
    kmlLayer_wf = null; // レイヤを削除したらnullにしておく
    }

    //災害ベンダー
    if (document.icon_select_point.vendor.checked && !kmlLayer_dv) { 
    kmlLayer_dv = omnivore.kml('./PlaceData/DisasterVendor.kml').on('ready', function() {
        kmlLayer_dv.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'Vendor') { //災害ベンダー
            layer.setIcon(Icon_Vendor);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.vendor.checked && kmlLayer_dv) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_dv);
    kmlLayer_dv = null; // レイヤを削除したらnullにしておく
    }

    //指定緊急避難場所
    if (document.icon_select_point.Evacuation_Designated.checked && !kmlLayer_de) { 
    kmlLayer_de = omnivore.kml('./PlaceData/DesignatedEmergencyEvacuationSite.kml').on('ready', function() {
        kmlLayer_de.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'Evacuation_Designated') { //指定緊急避難場所
            layer.setIcon(Icon_Evacuation_Designated);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.Evacuation_Designated.checked && kmlLayer_de) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_de);
    kmlLayer_de = null; // レイヤを削除したらnullにしておく
    }

    //ドラッグストア
    if (document.icon_select_point.DrugStore.checked && !kmlLayer_ds) { 
    kmlLayer_ds = omnivore.kml('./PlaceData/DrugStore.kml').on('ready', function() {
        kmlLayer_ds.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'DrugStore') { //ドラッグストア
            layer.setIcon(Icon_DrugStore);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.DrugStore.checked && kmlLayer_ds) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_ds);
    kmlLayer_ds = null; // レイヤを削除したらnullにしておく
    }

    //コインランドリー
    if (document.icon_select_point.Laundry.checked && !kmlLayer_cl) { 
    kmlLayer_cl = omnivore.kml('PlaceData/Laundry.kml').on('ready', function() {
        kmlLayer_cl.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'Laundry') { //コインランドリー
            layer.setIcon(Icon_Laundry);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.Laundry.checked && kmlLayer_cl) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_cl);
    kmlLayer_cl = null; // レイヤを削除したらnullにしておく
    }

    //入浴施設
    if (document.icon_select_point.HotSpring.checked && !kmlLayer_hs) { 
    kmlLayer_hs = omnivore.kml('./PlaceData/HotSpring.kml').on('ready', function() {
        kmlLayer_hs.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'HotSpring') { //コインランドリー
            layer.setIcon(Icon_HotSpring);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.HotSpring.checked && kmlLayer_hs) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_hs);
    kmlLayer_hs = null; // レイヤを削除したらnullにしておく
    }

    //公衆トイレ
    if (document.icon_select_point.PublicToilet.checked && !kmlLayer_pt) { 
    kmlLayer_pt = omnivore.kml('./PlaceData/PublicToilet.kml').on('ready', function() {
        kmlLayer_pt.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PublicToilet') { //公衆トイレ
            layer.setIcon(Icon_PublicToilet);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.PublicToilet.checked && kmlLayer_pt) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_pt);
    kmlLayer_pt = null; // レイヤを削除したらnullにしておく
    }

    //公衆電話
    if (document.icon_select_point.PublicPhone.checked && !kmlLayer_pp) { 
    kmlLayer_pp = omnivore.kml('./PlaceData/PublicPhone.kml').on('ready', function() {
        kmlLayer_pp.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PublicPhone') { //公衆電話
            layer.setIcon(Icon_PublicPhone);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.PublicPhone.checked && kmlLayer_pp) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_pp);
    kmlLayer_pp = null; // レイヤを削除したらnullにしておく
    }

    //セブンイレブン
    if (document.icon_select_point.ConvenienceStore_SevenEleven.checked && !kmlLayer_cs_se) { 
    kmlLayer_cs_se = omnivore.kml('./PlaceData/ConvenienceStore_SevenEleven.kml').on('ready', function() {
        kmlLayer_cs_se.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_SevenEleven') { //セブンイレブン
            layer.setIcon(Icon_ConvenienceStore_SevenEleven);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.ConvenienceStore_SevenEleven.checked && kmlLayer_cs_se) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_cs_se);
    kmlLayer_cs_se = null; // レイヤを削除したらnullにしておく
    }

    //ファミマ
    if (document.icon_select_point.ConvenienceStore_FamilyMart.checked && !kmlLayer_cs_fm) { 
    kmlLayer_cs_fm = omnivore.kml('./PlaceData/ConvenienceStore_FamilyMart.kml').on('ready', function() {
        kmlLayer_cs_fm.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_FamilyMart') { //ファミマ
            layer.setIcon(Icon_ConvenienceStore_FamilyMart);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.ConvenienceStore_FamilyMart.checked && kmlLayer_cs_fm) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_cs_fm);
    kmlLayer_cs_fm = null; // レイヤを削除したらnullにしておく
    }

    //ローソン
    if (document.icon_select_point.ConvenienceStore_Lawson.checked && !kmlLayer_cs_l) { 
    kmlLayer_cs_l = omnivore.kml('./PlaceData/ConvenienceStore_Lawson.kml').on('ready', function() {
        kmlLayer_cs_l.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_Lawson') { //ローソン
            layer.setIcon(Icon_ConvenienceStore_Lawson);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.ConvenienceStore_Lawson.checked && kmlLayer_cs_l) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_cs_l);
    kmlLayer_cs_l = null; // レイヤを削除したらnullにしておく
    }

    //auショップ
    if (document.icon_select_point.PhoneShop_au.checked && !kmlLayer_ps_au) { 
    kmlLayer_ps_au = omnivore.kml('./PlaceData/PhoneShop_au.kml').on('ready', function() {
        kmlLayer_ps_au.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_au') { //auショップ
            layer.setIcon(Icon_PhoneShop_au);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.PhoneShop_au.checked && kmlLayer_ps_au) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_ps_au);
    kmlLayer_ps_au = null; // レイヤを削除したらnullにしておく
    }

    //docomo
    if (document.icon_select_point.PhoneShop_docomo.checked && !kmlLayer_ps_dcm) { 
    kmlLayer_ps_dcm = omnivore.kml('./PlaceData/PhoneShop_docomo.kml').on('ready', function() {
        kmlLayer_ps_dcm.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_docomo') { //docomo
            layer.setIcon(Icon_PhoneShop_docomo);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.PhoneShop_docomo.checked && kmlLayer_ps_dcm) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_ps_dcm);
    kmlLayer_ps_dcm = null; // レイヤを削除したらnullにしておく
    }

    //softbank
    if (document.icon_select_point.PhoneShop_softbank.checked && !kmlLayer_ps_sb) { 
    kmlLayer_ps_sb = omnivore.kml('./PlaceData/PhoneShop_softbank.kml').on('ready', function() {
        kmlLayer_ps_sb.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_softbank') { //softbank
            layer.setIcon(Icon_PhoneShop_softbank);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }else if (!document.icon_select_point.PhoneShop_softbank.checked && kmlLayer_ps_sb) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(kmlLayer_ps_sb);
    kmlLayer_ps_sb = null; // レイヤを削除したらnullにしておく
    }

    /*タイルレイヤデータ*/
    //洪水レイヤ
    var infoFlood = document.getElementById("infoFlood");
    if (document.icon_select_layer.Flood.checked && !Layer_flood) {
    Layer_flood = L.tileLayer('https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png', {
        opacity: 0.5
    }).addTo(map);

    //画像を表示
    infoFlood.style.display = 'block';
    }else if (!document.icon_select_layer.Flood.checked && Layer_flood) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(Layer_flood);
    Layer_flood = null; // レイヤを削除したらnullにしておく

    infoFlood.style.display = 'none';
    }

    //土石流レイヤ
    if (document.icon_select_layer.DebrisFlow.checked && !Layer_DebrisFlow) { 
    Layer_DebrisFlow = L.tileLayer('https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/20/{z}/{x}/{y}.png', {
        opacity: 0.5
    }).addTo(map);


    }else if (!document.icon_select_layer.DebrisFlow.checked && Layer_DebrisFlow) {
    // チェックボックスがOFFの場合、レイヤを削除
    map.removeLayer(Layer_DebrisFlow);
    Layer_DebrisFlow = null; // レイヤを削除したらnullにしておく
    }
}

function CheckAll(){
    //コンビニ
    if (document.icon_select_point.ConvenienceStore.checked) { 
    if(!kmlLayer_cs_se){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_SevenEleven").checked = true;
        kmlLayer_cs_se = omnivore.kml('./PlaceData/ConvenienceStore_SevenEleven.kml').on('ready', function() {
        kmlLayer_cs_se.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_SevenEleven') { //セブンイレブン
            layer.setIcon(Icon_ConvenienceStore_SevenEleven);
            }
            else {
            layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
        }
        });
    }).addTo(map);
    }
    if(!kmlLayer_cs_fm){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_FamilyMart").checked = true;
        kmlLayer_cs_fm = omnivore.kml('./PlaceData/ConvenienceStore_FamilyMart.kml').on('ready', function() {
        kmlLayer_cs_fm.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_FamilyMart') { //ファミマ
                layer.setIcon(Icon_ConvenienceStore_FamilyMart);
            }
            else {
                layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
            }
        });
        }).addTo(map);
    }
    if(!kmlLayer_cs_l){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_Lawson").checked = true;
        kmlLayer_cs_l = omnivore.kml('./PlaceData/ConvenienceStore_Lawson.kml').on('ready', function() {
        kmlLayer_cs_l.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'ConvenienceStore_Lawson') { //ローソン
                layer.setIcon(Icon_ConvenienceStore_Lawson);
            }
            else {
                layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
            }
        });
        }).addTo(map);
    }
    }else if (!document.icon_select_point.ConvenienceStore.checked) {
    if(kmlLayer_cs_se){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_SevenEleven").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_cs_se);
        kmlLayer_cs_se = null; // レイヤを削除したらnullにしておく
    }
    if(kmlLayer_cs_fm){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_FamilyMart").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_cs_fm);
        kmlLayer_cs_fm = null; // レイヤを削除したらnullにしておく
    }
    if(kmlLayer_cs_l){
        // チェックボックスのチェックをつける
        document.getElementById("ConvenienceStore_Lawson").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_cs_l);
        kmlLayer_cs_l = null; // レイヤを削除したらnullにしておく
    }
    }

    //携帯会社
    if (document.icon_select_point.PhoneShop.checked) { 
    if(!kmlLayer_ps_au){
        // チェックボックスのチェックをつける
        document.getElementById("PhoneShop_au").checked = true;
        kmlLayer_ps_au = omnivore.kml('./PlaceData/PhoneShop_au.kml').on('ready', function() {
            kmlLayer_ps_au.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_au') { //auショップ
                layer.setIcon(Icon_PhoneShop_au);
            }
            else {
                layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
            }
        });
        }).addTo(map);
    }
    if(!kmlLayer_ps_dcm){
        // チェックボックスのチェックをつける
        document.getElementById("PhoneShop_docomo").checked = true;
        kmlLayer_ps_dcm = omnivore.kml('./PlaceData/PhoneShop_docomo.kml').on('ready', function() {
            kmlLayer_ps_dcm.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_docomo') { //docomo
                layer.setIcon(Icon_PhoneShop_docomo);
            }
            else {
                layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
            }
        });
        }).addTo(map);
    }
    if(!kmlLayer_ps_sb){
        // チェックボックスのチェックをつける
        document.getElementById("PhoneShop_softbank").checked = true;
        kmlLayer_ps_sb = omnivore.kml('./PlaceData/PhoneShop_softbank.kml').on('ready', function() {
        kmlLayer_ps_sb.eachLayer(function(layer) {
            if (layer instanceof L.Marker) {
            var feature = layer.feature; // GeoJSON feature
            // ExtendedData内のcategory属性を取得
            var category = feature.properties['category'];
            if (category === 'PhoneShop_softbank') { //softbank
                layer.setIcon(Icon_PhoneShop_softbank);
            }
            else {
                layer.setIcon(Icon_Error); //エラー表示
            }
            // layerに対してポップアップを設定
            layer.bindPopup(layer.feature.properties.description);
            }
        });
        }).addTo(map);
    }
    }else if (!document.icon_select_point.PhoneShop.checked) {
    if(kmlLayer_ps_au){
        // チェックボックスのチェックを外す
        document.getElementById("PhoneShop_au").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_ps_au);
        kmlLayer_ps_au = null; // レイヤを削除したらnullにしておく
    }
    if(kmlLayer_ps_dcm){
        // チェックボックスのチェックを外す
        document.getElementById("PhoneShop_docomo").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_ps_dcm);
        kmlLayer_ps_dcm = null; // レイヤを削除したらnullにしておく
    }
    if(kmlLayer_ps_sb){
        // チェックボックスのチェックを外す
        document.getElementById("PhoneShop_softbank").checked = false;
        // チェックボックスがOFFの場合、レイヤを削除
        map.removeLayer(kmlLayer_ps_sb);
        kmlLayer_ps_sb = null; // レイヤを削除したらnullにしておく
    }
    }
}

function Debag(){    
    //フリーWi-Fi
    if (document.icon_select_point.WiFi.checked && kmlLayer_wf) { 
    document.getElementById("WiFi").checked = false;
    map.removeLayer(kmlLayer_wf);
    kmlLayer_wf = null; // レイヤを削除したらnullにしておく
    }

    //災害ベンダー
    if (document.icon_select_point.vendor.checked && kmlLayer_dv) { 
    document.getElementById("vendor").checked = false;
    map.removeLayer(kmlLayer_dv);
    kmlLayer_dv = null; // レイヤを削除したらnullにしておく
    }

    // //広域避難場所
    // if (document.icon_select_point.DisasterArea_Wide.checked && kmlLayer_ew) { 
    //   document.getElementById("DisasterArea_Wide").checked = false;
    //   map.removeLayer(kmlLayer_ew);
    //   kmlLayer_ew = null; // レイヤを削除したらnullにしておく
    // }

    //指定緊急避難場所
    if (document.icon_select_point.Evacuation_Designated.checked && kmlLayer_de) { 
    document.getElementById("Evacuation_Designated").checked = false;
    map.removeLayer(kmlLayer_de);
    kmlLayer_de = null; // レイヤを削除したらnullにしておく
    }

    //ドラッグストア
    if (document.icon_select_point.DrugStore.checked && kmlLayer_ds) {
    document.getElementById("DrugStore").checked = false;
    map.removeLayer(kmlLayer_ds);
    kmlLayer_ds = null; // レイヤを削除したらnullにしておく
    }

    //コインランドリー
    if (document.icon_select_point.Laundry.checked && kmlLayer_cl) { 
    document.getElementById("Laundry").checked = false;
    map.removeLayer(kmlLayer_cl);
    kmlLayer_cl = null; // レイヤを削除したらnullにしておく
    }

    //入浴施設
    if (document.icon_select_point.HotSpring.checked && kmlLayer_hs) { 
    document.getElementById("HotSpring").checked = false;
    map.removeLayer(kmlLayer_hs);
    kmlLayer_hs = null; // レイヤを削除したらnullにしておく
    }

    //公衆トイレ
    if (document.icon_select_point.PublicToilet.checked && kmlLayer_pt) { 
    document.getElementById("PublicToilet").checked = false;
    map.removeLayer(kmlLayer_pt);
    kmlLayer_pt = null; // レイヤを削除したらnullにしておく
    }

    //公衆電話
    if (document.icon_select_point.PublicPhone.checked && kmlLayer_pp) { 
    document.getElementById("PublicPhone").checked = false;
    map.removeLayer(kmlLayer_pp);
    kmlLayer_pp = null; // レイヤを削除したらnullにしておく
    }

    document.getElementById("ConvenienceStore").checked = false;

    //セブンイレブン
    if (document.icon_select_point.ConvenienceStore_SevenEleven.checked && kmlLayer_cs_se) { 
    document.getElementById("ConvenienceStore_SevenEleven").checked = false;
    map.removeLayer(kmlLayer_cs_se);
    kmlLayer_cs_se = null; // レイヤを削除したらnullにしておく
    }

    //ファミマ
    if (document.icon_select_point.ConvenienceStore_FamilyMart.checked && kmlLayer_cs_fm) { 
    document.getElementById("ConvenienceStore_FamilyMart").checked = false;
    map.removeLayer(kmlLayer_cs_fm);
    kmlLayer_cs_fm = null; // レイヤを削除したらnullにしておく
    }

    //ローソン
    if (document.icon_select_point.ConvenienceStore_Lawson.checked && kmlLayer_cs_l) { 
    document.getElementById("ConvenienceStore_Lawson").checked = false;
    map.removeLayer(kmlLayer_cs_l);
    kmlLayer_cs_l = null; // レイヤを削除したらnullにしておく
    }

    document.getElementById("PhoneShop").checked = false;

    //auショップ
    if (document.icon_select_point.PhoneShop_au.checked && kmlLayer_ps_au) { 
    document.getElementById("PhoneShop_au").checked = false;
    map.removeLayer(kmlLayer_ps_au);
    kmlLayer_ps_au = null; // レイヤを削除したらnullにしておく
    }

    //docomo
    if (document.icon_select_point.PhoneShop_docomo.checked && kmlLayer_ps_dcm) { 
    document.getElementById("PhoneShop_docomo").checked = false;
    map.removeLayer(kmlLayer_ps_dcm);
    kmlLayer_ps_dcm = null; // レイヤを削除したらnullにしておく
    }

    //softbank
    if (document.icon_select_point.PhoneShop_softbank.checked && kmlLayer_ps_sb) {
    document.getElementById("PhoneShop_softbank").checked = false;
    map.removeLayer(kmlLayer_ps_sb);
    kmlLayer_ps_sb = null; // レイヤを削除したらnullにしておく
    }
}

function openModal() {
    const modal = document.getElementById('modal');
    const closeEls = modal.querySelectorAll('[data-close]');
    modal.hidden = false;
    document.body.classList.add('modal-open');
    // フォーカスを閉じるボタンへ（簡易フォーカス管理）
    modal.querySelector('#closeBtn')?.focus();

    closeEls.forEach(
    el => el.addEventListener('click', startGuide)
    );
    document.addEventListener('keydown', escClose);
}

//現在地取得
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition(
    function (position) {
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    console.log("現在地:", lat, lng);
    // ここでピンを打つ処理を呼び出す
    addMarker(lat, lng);
    },
    function (error) {
    console.error("位置情報エラー:", error);
    }
);
} else {
alert("お使いのブラウザは位置情報に対応していません");
}


function addMarker(lat, lng) {
const pos = [lat, lng];
L.marker(pos).addTo(map).bindPopup("現在地").openPopup();
map.setView(pos, 15);
}


window.addEventListener('ready', Check);