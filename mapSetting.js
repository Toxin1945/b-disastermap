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
    DisasterArea_Wide:   { url: './Icon/Wide area evacuation site.png' },
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
    Vendor:            { url: './PlaceData/DisasterVendor.kml',layerCategory: 'Vendor',icon: icons.Vendor},
    SafeFaucet:        { url: './PlaceData/SafeFaucet.kml',layerCategory: 'SafeFaucet',icon: icons.SafeFaucet},
    DisasterArea_Wide:   { url: './PlaceData/WideAreaEvacuationSite.kml',layerCategory: 'Evacuation_Wide',icon: icons.DisasterArea_Wide},
    Evacuation_Designated: { url: './PlaceData/DesignatedEmergencyEvacuationSite.kml',layerCategory: 'Evacuation_Designated',icon: icons.Evacuation_Designated},
    DrugStore:         { url: './PlaceData/DrugStore.kml',layerCategory: 'DrugStore',icon: icons.DrugStore},
    Laundry:           { url: './PlaceData/Laundry.kml',layerCategory: 'Laundry',icon: icons.Laundry},
    HotSpring:         { url: './PlaceData/HotSpring.kml',layerCategory: 'HotSpring',icon: icons.HotSpring},
    PublicToilet:      { url: './PlaceData/PublicToilet.kml',layerCategory: 'PublicToilet',icon: icons.PublicToilet},
    PublicPhone:       { url: './PlaceData/PublicPhone.kml',layerCategory: 'PublicPhone',icon: icons.PublicPhone},
    Convenience_SevenEleven: { url: './PlaceData/ConvenienceStore_SevenEleven.kml',layerCategory: 'ConvenienceStore_SevenEleven',icon: icons.Convenience_SevenEleven},
    Convenience_FamilyMart:  { url: './PlaceData/ConvenienceStore_FamilyMart.kml',layerCategory: 'ConvenienceStore_FamilyMart',icon: icons.Convenience_FamilyMart},
    Convenience_Lawson:      { url: './PlaceData/ConvenienceStore_Lawson.kml',layerCategory: 'ConvenienceStore_Lawson',icon: icons.Convenience_Lawson},
    PhoneShop_au:      { url: './PlaceData/PhoneShop_au.kml',layerCategory: 'PhoneShop_au',icon: icons.PhoneShop_au},
    PhoneShop_docomo:  { url: './PlaceData/PhoneShop_docomo.kml',layerCategory: 'PhoneShop_docomo',icon: icons.PhoneShop_docomo},
    PhoneShop_softbank:{ url: './PlaceData/PhoneShop_softbank.kml',layerCategory: 'PhoneShop_softbank',icon: icons.PhoneShop_softbank}
};
const iconLayers = {};
//アイコンレイヤー作成
for (const key in iconLayerConfig) {
    const cfg = iconLayerConfig[key];
    iconLayers[key] = setIconLayer(cfg.url,cfg.layerCategory,cfg.icon);
}

//チェックボックス(アイコン)
const iconCheckboxConfig = {
    WiFi:                    {name: document.icon_select_point.WiFi},
    Vendor:                  {name: document.icon_select_point.Vendor},
    SafeFaucet:              {name: document.icon_select_point.SafeFaucet},
    DisasterArea_Wide:       {name: document.icon_select_point.DisasterArea_Wide},
    Evacuation_Designated:   {name: document.icon_select_point.Evacuation_Designated},
    DrugStore:               {name: document.icon_select_point.DrugStore},
    Laundry:                 {name: document.icon_select_point.Laundry},
    HotSpring:               {name: document.icon_select_point.HotSpring},
    PublicToilet:            {name: document.icon_select_point.PublicToilet},
    PublicPhone:             {name: document.icon_select_point.PublicPhone},
    ConvenienceStore:        {name: document.icon_select_point.ConvenienceStore},
    Convenience_SevenEleven: {name: document.icon_select_point.ConvenienceStore_SevenEleven},
    Convenience_FamilyMart:  {name: document.icon_select_point.ConvenienceStore_FamilyMart},
    Convenience_Lawson:      {name: document.icon_select_point.ConvenienceStore_Lawson},
    PhoneShop:               {name: document.icon_select_point.PhoneShop},
    PhoneShop_au:            {name: document.icon_select_point.PhoneShop_au},
    PhoneShop_docomo:        {name: document.icon_select_point.PhoneShop_docomo},
    PhoneShop_softbank:      {name: document.icon_select_point.PhoneShop_softbank}
};
//チェックボックス(エリア)
const areaCheckboxConfig = {
    Flood:           {name: document.area_select_layer.Flood},
    DebrisFlow:      {name: document.area_select_layer.DebrisFlow}
};



document.addEventListener("DOMContentLoaded", function() {
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

    //基礎レイヤ追加
    map = L.map('map').setView([36.648735,138.19494], 18);
    L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution: '国土地理院'
    }).addTo(map);

    //アイコンレイヤ表示
    const iconForm = document.forms['icon_select_point'];

    for(const key in iconCheckboxConfig){
        if (iconForm[key] && iconForm[key].checked){
            iconLayers[key].addTo(map);
        }
    }

    const areaForm = document.forms['area_select_layer'];
    for(const key in areaCheckboxConfig){
        if (areaForm[key] && areaForm[key].checked){
            areaLayers[key].addTo(map);
        }
    }
});

//表示・非表示を切り替え
function Check(el,child){
    console.log(child);
    //レイヤー追加
    if (el.checked) {
        iconLayers[el.name].addTo(map);
    }else if (!el.checked) {
        map.removeLayer(iconLayers[el.name]);
        if(child != null && child.checked){
            child.checked = false;
        }
    }
}

function CheckArea(el){
    //レイヤー追加
    if (el.checked) {
        areaLayers[el.name].addTo(map);
    }else if (!el.checked) {
        map.removeLayer(areaLayers[el.name]);
    }
}

// フィルタ処理
function filterShelters(el,parent) {
    var parentChecked = parent.checked;
    if(!parentChecked){
        parent.checked = true;
    }
    iconLayers['DisasterArea_Wide'].eachLayer(function (layer) {
        if (layer instanceof L.Marker) {
            layer.remove();
        }
    });

    // 再描画
    iconLayers['DisasterArea_Wide'].eachLayer(function (layer) {
        const feature = layer.feature;
        if (!(layer instanceof L.Marker)) return;

        if (el.checked) {
            if (feature.properties['指定避難所'] === '○') {
                layer.addTo(map);
            }
        } else {
            layer.addTo(map);
        }
    });
}

function CheckAll(parent,children){
    children.forEach(child=>{
        console.log(child);
        child.checked = parent.checked;
        Check(child,null);
    })
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


function addMarker(lat, lng) {
    const pos = [lat, lng];
    //L.marker(pos).addTo(map).bindPopup("現在地").openPopup();
    //map.setView(pos, 15);
}