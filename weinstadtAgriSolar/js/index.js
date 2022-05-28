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

    let grassForPanel = true
    const urlGrass = "./data/grass2Line.glb";

    const modelGenerator = new ModelGenerator(viewer, numColumn, numRow, lonIncrement, latIncrement, initLon, initLan, height);
    const urlPanel = document.querySelector('input[name="btn-radio-type"]:checked').value;

    modelGenerator.generateTreeModel(urlGrass, solarPanels)
    modelGenerator.generatePanelModel(urlPanel, solarPanels)

    const target = modelGenerator.target(9.370023262377668, 48.81836398378254)
    const offset = modelGenerator.offset(50, -90, 90)

    let btnRadioType1 = document.getElementById('btn-radio-type-1')
    let btnRadioType2 = document.getElementById('btn-radio-type-2')
    let btnRadioType3 = document.getElementById('btn-radio-type-3')

    btnRadioType2.onclick = function () {
        if (btnRadioType2.getAttribute("checked") == null) {
            btnRadioType2.setAttribute("checked", "true");
            btnRadioType2.checked = true;
            btnRadioType3.removeAttribute("checked");
            btnRadioType3.checked = false;
            btnRadioType1.removeAttribute("checked");
            btnRadioType1.checked = false;
            console.log(document.querySelector('input[name="btn-radio-type"]:checked').value);
            if (grassForPanel == false) {
                grassForPanel = true
                console.log(grassForPanel);
                modelGenerator.removeAllEntities();
                modelGenerator.generatePanelModel("./data/verticalPanelM90.glb", solarPanels);
                modelGenerator.generateTreeModel(urlGrass, solarPanels);
            } else {
                modelGenerator.removeEntitiesById();
                modelGenerator.generatePanelModel("./data/verticalPanelM90.glb", solarPanels);
            };
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
            console.log(document.querySelector('input[name="btn-radio-type"]:checked').value);
            if (grassForPanel == false) {
                grassForPanel = true
                console.log(grassForPanel);
                modelGenerator.removeAllEntities();
                modelGenerator.generatePanelModel("./data/groundPanelM90.glb", solarPanels);
                modelGenerator.generateTreeModel(urlGrass, solarPanels);
            } else {
                modelGenerator.removeEntitiesById()
                modelGenerator.generatePanelModel("./data/groundPanelM90.glb", solarPanels)
            }
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
            console.log(document.querySelector('input[name="btn-radio-type"]:checked').value);
            if (grassForPanel) {
                grassForPanel = false
                console.log(grassForPanel);
                modelGenerator.removeAllEntities()
                modelGenerator.generateTreeModel("./data/agiSolarTrees.glb", agriSolarLocation)
            } 
            // modelGenerator.removeAllEntities()
            // modelGenerator.generatePanelModel(document.querySelector('input[name="btnradio"]:checked').value, solarPanels)
        }
    };

    let btnRadioPosition1 = document.getElementById('btn-radio-position-1')
    let btnRadioPosition2 = document.getElementById('btn-radio-position-2')

    btnRadioPosition1.onclick = function () {
        if (btnRadioPosition1.getAttribute("checked") == null) {
            btnRadioPosition1.setAttribute("checked", "true");
            btnRadioPosition1.checked = true;
            btnRadioPosition2.removeAttribute("checked");
            btnRadioPosition2.checked = false;
            console.log(document.querySelector('input[name="btn-radio-position"]:checked').value);
            const target = modelGenerator.target(9.370023262377668, 48.81836398378254)
            viewer.scene.camera.lookAt(target, offset);
            // modelGenerator.generatePanelModel(document.querySelector('input[name="btnradio"]:checked').value, solarPanels)
        }
    };

    btnRadioPosition2.onclick = function () {
        if (btnRadioPosition2.getAttribute("checked") == null) {
            btnRadioPosition2.setAttribute("checked", "true");
            btnRadioPosition2.checked = true;
            btnRadioPosition1.removeAttribute("checked");
            btnRadioPosition1.checked = false;
            console.log(document.querySelector('input[name="btn-radio-position"]:checked').value);
            const target = modelGenerator.target(9.379149543759475, 48.792965757926986)
            viewer.scene.camera.lookAt(target, offset);
            // modelGenerator.generatePanelModel(document.querySelector('input[name="btnradio"]:checked').value, solarPanels)
        }
    };

    viewer.scene.camera.lookAt(target, offset);
}
