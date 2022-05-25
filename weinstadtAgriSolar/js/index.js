'use strict';
import ModelGenerator from "./ModelGenerator.js";
import solarPanels from './solarPanels.js';
import grass from './grass.js';
import grassLocation from "./grass.js";
import agriSolarLocation from "./agriSolar.js"

console.log(solarPanels.features);
console.log(solarPanels.features[0].properties.lat);
console.log(solarPanels.features.length);

console.log(grass.features);

if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    const viewer = new Cesium.Viewer("cesiumContainer");

    const numColumn = 8;
    const numRow = 11;
    const lonIncrement = 0.00015;
    const latIncrement = 0.00008;
    const initLon = 9.3916132322;
    const initLan = 48.8205517603;
    const height = 0;


    const urlGrass = "./data/agiSolar.glb";

    const modelGenerator = new ModelGenerator(viewer, numColumn, numRow, lonIncrement, latIncrement, initLon, initLan, height);
    const urlPanel = document.querySelector('input[name="btnradio"]:checked').value;

    modelGenerator.generateTreeModel(urlGrass, agriSolarLocation)
    // modelGenerator.generatePanelModel(urlPanel, solarPanels)

    // let btnRadio1 = document.getElementById('btnradio1')
    // let btnRadio2 = document.getElementById('btnradio2')

    // btnRadio2.onclick = function () {
    //     if (btnRadio2.getAttribute("checked") == null) {
    //         btnRadio2.setAttribute("checked", "true");
    //         btnRadio2.checked = true;
    //         btnRadio1.removeAttribute("checked");
    //         btnRadio1.checked = false;
    //         console.log(document.querySelector('input[name="btnradio"]:checked').value);
    //         modelGenerator.removeAllEntities()
    //         modelGenerator.generatePanelModel(document.querySelector('input[name="btnradio"]:checked').value, solarPanels)
    //     }
    // };

    // btnRadio1.onclick = function () {
    //     if (btnRadio1.getAttribute("checked") == null) {
    //         btnRadio1.setAttribute("checked", "true");
    //         btnRadio1.checked = true;
    //         btnRadio2.removeAttribute("checked");
    //         btnRadio2.checked = false;
    //         console.log(document.querySelector('input[name="btnradio"]:checked').value);
    //         modelGenerator.removeAllEntities()
    //         modelGenerator.generatePanelModel(document.querySelector('input[name="btnradio"]:checked').value, solarPanels)
    //     }
    // };





    const target = modelGenerator.target(solarPanels)

    const offset = modelGenerator.offset(0, -50, 30)

    viewer.scene.camera.lookAt(target, offset);
}
