'use strict';
import ModelGenerator from "./ModelGenerator.js";
import coorSolarPanel1 from './solarPanelCoor1.js';
import coorSolarPanel2 from './solarPanelCoor2.js';


Cesium.Ion.defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNDFmODI5Zi00ZDNhLTRkMDItYWY4Mi01MWY5MDgwMDE2ZWYiLCJpZCI6ODcyMTYsImlhdCI6MTY0ODQwMzYxOX0.r0ebixHbBDQ8CCW0jx915yrL6J5cvJWyoMLvhYWfDo0";

if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    const viewer = new Cesium.Viewer("cesiumContainer", {
        shadows: false,
        terrainProvider: new Cesium.CesiumTerrainProvider({
            url: Cesium.IonResource.fromAssetId(1084935),
        })
    });

    var pTime = Cesium.JulianDate.fromIso8601('2016-05-13T09:56:04+02');
    console.log(pTime);
    viewer.clock.currentTime = new Cesium.JulianDate(2457507.90000);
    viewer.clock.multiplier = 1.0;


    const urlPanelGround = "./data/groundSolarGrass1.glb";
    const urlPanelVertical = "./data/verticalSolarGrass1.glb";
    const urlPanelAgriSolar = "./data/agiSolarGrass3.glb";

    let btnRadioType1 = document.getElementById('btn-radio-type-1');
    let btnRadioType2 = document.getElementById('btn-radio-type-2');
    let btnRadioType3 = document.getElementById('btn-radio-type-3');

    let btnRadioPosition1 = document.getElementById('btn-radio-position-1');
    let btnRadioPosition2 = document.getElementById('btn-radio-position-2');

    let checkBoxShadow = document.getElementById('check-box-shadow');

    const modelGenerator = new ModelGenerator(viewer);

    const targetBeutelstein = {
        destination: new Cesium.Cartesian3.fromDegrees(
            9.371723262377668,
            48.81706398378254,
            300
        ),
        orientation: new Cesium.HeadingPitchRoll(
            5.646733805039757,
            -0.276607153839886,
            6.281110875400085
        ),
    }

    const targetBurg = {
        destination: new Cesium.Cartesian3.fromDegrees(
            9.38049543759475,
            48.791965757926986,
            420
        ),
        orientation: new Cesium.HeadingPitchRoll(
            5.646733805039757,
            -0.276607153839886,
            6.281110875400085
        ),
    }


    modelGenerator.generateSimpleModel(urlPanelGround, coorSolarPanel1, 'position 1');
    modelGenerator.generateSimpleModel(urlPanelGround, coorSolarPanel2, 'position 2');

    btnRadioType2.onclick = function () {
        if (btnRadioType2.getAttribute("checked") == null) {
            btnRadioType2.setAttribute("checked", "true");
            btnRadioType2.checked = true;
            btnRadioType3.removeAttribute("checked");
            btnRadioType3.checked = false;
            btnRadioType1.removeAttribute("checked");
            btnRadioType1.checked = false;

            modelGenerator.removeAllEntities();
            modelGenerator.generateSimpleModel(urlPanelVertical, coorSolarPanel1, 'position 1');
            modelGenerator.generateSimpleModel(urlPanelVertical, coorSolarPanel2, 'position 2');
        }
    };

    btnRadioType1.onclick = function () {
        if (btnRadioType1.getAttribute("checked") == null) {
            btnRadioType1.setAttribute("checked", "true");
            btnRadioType1.checked = true;
            btnRadioType3.removeAttribute("checked");
            btnRadioType3.checked = false;
            btnRadioType2.removeAttribute("checked");
            btnRadioType2.checked = false;

            modelGenerator.removeAllEntities();
            modelGenerator.generateSimpleModel(urlPanelGround, coorSolarPanel1, 'position 1');
            modelGenerator.generateSimpleModel(urlPanelGround, coorSolarPanel2, 'position 2');
        }
    };

    btnRadioType3.onclick = function () {
        if (btnRadioType3.getAttribute("checked") == null) {
            btnRadioType3.setAttribute("checked", "true");
            btnRadioType3.checked = true;
            btnRadioType2.removeAttribute("checked");
            btnRadioType2.checked = false;
            btnRadioType1.removeAttribute("checked");
            btnRadioType1.checked = false;

            modelGenerator.removeAllEntities();
            modelGenerator.generateSimpleModel(urlPanelAgriSolar, coorSolarPanel1, 'position 1');
            modelGenerator.generateSimpleModel(urlPanelAgriSolar, coorSolarPanel2, 'position 2');
        }
    };


    btnRadioPosition1.onclick = function () {
        if (btnRadioPosition1.getAttribute("checked") == null) {
            btnRadioPosition1.setAttribute("checked", "true");
            btnRadioPosition1.checked = true;
            btnRadioPosition2.removeAttribute("checked");
            btnRadioPosition2.checked = false;
            viewer.scene.camera.setView(targetBeutelstein);
        }
    };

    btnRadioPosition2.onclick = function () {
        if (btnRadioPosition2.getAttribute("checked") == null) {
            btnRadioPosition2.setAttribute("checked", "true");
            btnRadioPosition2.checked = true;
            btnRadioPosition1.removeAttribute("checked");
            btnRadioPosition1.checked = false;
            viewer.scene.camera.setView(targetBurg);
        }
    };

    checkBoxShadow.onclick = function () {
        if (checkBoxShadow.checked == true) {
            viewer.shadows = true;
        } else {
            viewer.shadows = false;
        }
    };

    viewer.scene.camera.setView(targetBeutelstein);
};