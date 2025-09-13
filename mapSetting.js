//基礎マップレイヤ
let map;
var removeMarkers = [];



//アイコン
// 共通アイコン作成関数
function setIcon(url, size = [30,30], anchor = [15,10], popup = [0,-20]) {
    return L.icon({
        iconUrl: url,
        iconRetinaUrl: url,  // Retina 用も同じファイルを使うなら共通でOK
        iconSize: size,
        iconAnchor: anchor,
        popupAnchor: popup
    });
}
// アイコン設定
const iconConfig = {
    WiFi:              { url: './Icon/FreeWi-Fi.png' },
    Vendor:            { url: './Icon/Disaster Vendor.png' },
    SafeFaucet:        { url: './Icon/SafeFaucet.png' },
    Evacuation_Wide:   { url: './Icon/Wide area evacuation site.png' },
    Evacuation_Designated: { url: './Icon/Designated emergency evacuation site.png' },
    DrugStore:         { url: './Icon/drug store.png' },
    Laundry:           { url: './Icon/coinraundry.png' },
    HotSpring:         { url: './Icon/hot spring.png' },
    PublicToilet:      { url: './Icon/restroom.png' },
    PublicPhone:       { url: './Icon/phone.png' },
    Convenience_SevenEleven: { url: './Icon/convenience.png' },
    Convenience_FamilyMart:  { url: './Icon/FamilyMart.png' },
    Convenience_Lawson:      { url: './Icon/LAWSON.png' },
    PhoneShop_au:      { url: './Icon/au.png',      size: [50,30], anchor: [25,10], popup: [15,-20] },
    PhoneShop_docomo:  { url: './Icon/docomo.png',  size: [50,30], anchor: [25,10], popup: [15,-20] },
    PhoneShop_softbank:{ url: './Icon/softbank.png',size: [50,7],  anchor: [25,4],  popup: [20,-3] },
    Test:              { url: './Icon/Test.png' },
    Error:             { url: './Icon/Error.png',   size: [100,100], anchor: [50,40], popup: [0,-60] }
};
const icons = {};
//アイコン作成
for (const key in iconConfig) {
    const cfg = iconConfig[key];
    icons[key] = setIcon(cfg.url, cfg.size, cfg.anchor, cfg.popup);
}



//レイヤー
// 共通警戒区域レイヤー作成関数
function setAreaLayer(url,opacity = 0.5){
    return L.tileLayer(url, {opacity: opacity});
}
const areaLayerConfig = {
    Flood: {url: 'https://disaportaldata.gsi.go.jp/raster/01_flood_l2_shinsuishin_kuni_data/{z}/{x}/{y}.png'},
    DebrisFlow: {url: 'https://disaportaldata.gsi.go.jp/raster/05_dosekiryukeikaikuiki_data/20/{z}/{x}/{y}.png'}
};
const areaLayers = {};
//警戒区域レイヤ―作成
for(const key in areaLayerConfig){
    const cfg = areaLayerConfig[key];
    areaLayers[key] = setAreaLayer(cfg.url,cfg.opacity);
}


//共通アイコンレイヤー作成関数
function setIconLayer(pass, layerCategory, icon) {
    const layer = omnivore.kml(pass).on('ready', function() {
        layer.eachLayer(function(lay) {
            if (lay instanceof L.Marker) {
                var feature = lay.feature;
                var category = feature.properties['category'];
                if (category == layerCategory) {
                    lay.setIcon(icon);
                } else {
                    lay.setIcon(icons.Error);
                }
            }
            // ポップアップを設定
            lay.bindPopup(lay.feature.properties.description);
        });
    });
    return layer;
}

//アイコンレイヤー設定
const iconLayerConfig = {
    WiFi:              { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Vendor:            { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    SafeFaucet:        { url: './PlaceData/',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Evacuation_Wide:   { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Evacuation_Designated: { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    DrugStore:         { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Laundry:           { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    HotSpring:         { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    PublicToilet:      { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    PublicPhone:       { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Convenience_SevenEleven: { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Convenience_FamilyMart:  { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    Convenience_Lawson:      { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    PhoneShop_au:      { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    PhoneShop_docomo:  { url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi},
    PhoneShop_softbank:{ url: './PlaceData/Free Wi-Fi.kml',layerCategory: 'FreeWiFi',icon: icons.WiFi}
};
const iconLayers = {};
//アイコンレイヤー作成
for (const key in iconLayerConfig) {
    const cfg = iconLayerConfig[key];
    iconLayers[key] = setIconLayer(cfg.url,cfg.layerCategory,cfg.icon);
}

//チェックボックス
const checkboxConfig = {
    WiFi:           {name: document.icon_select_point.WiFi},
    Vendor:           {name: document.icon_select_point.vendor},
    Evacuation_Wide:   {name: document.icon_select_point.safeFaucet},
    Evacuation_Designated: {name: document.icon_select_point.DisasterArea_Wide},
    DrugStore:         {name: document.icon_select_point.WiFi},
    Laundry:           {name: document.icon_select_point.WiFi},
    HotSpring:         {name: document.icon_select_point.WiFi},
    PublicToilet:      {name: document.icon_select_point.WiFi},
    PublicPhone:       {name: document.icon_select_point.WiFi},
    Convenience_SevenEleven: {name: document.icon_select_point.WiFi},
    Convenience_FamilyMart:  {name: document.icon_select_point.WiFi},
    Convenience_Lawson:      {name: document.icon_select_point.WiFi},
    PhoneShop_au:      {name: document.icon_select_point.WiFi},
    PhoneShop_docomo:  {name: document.icon_select_point.WiFi},
    PhoneShop_softbank:{name: document.icon_select_point.WiFi}

};


window.onload = function(){
    //基礎レイヤ追加
    map = L.map('map').setView([36.648735,138.19494], 18);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: '国土地理院'
    }).addTo(map);

    //初期表示
    for(const key in checkboxConfig){
        const cfg = checkboxConfig[key];
        if (cfg.name.checked){
            iconLayers[key].addTo(map);
        }
    }
}

function Check(){
    //フリーWi-Fi
    if (document.icon_select_point.WiFi.checked && !kmlLayer_wf) {
        //フリーWi-Fi追加(初期値：表示)
        kmlLayer_wf.add(map);
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