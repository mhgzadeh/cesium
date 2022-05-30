'use strict';
import ModelGenerator from "./ModelGenerator.js";
import solarPanels from './solarPanels.js';
import agriSolarLocation from "./agriSolar.js"


if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    const viewer = new Cesium.Viewer("cesiumContainer");
    
    const height = 0;
    let grassForPanel = true
    
    const urlGrass = "./data/grass2Line.glb";
    const urlPanel = "./data/groundPanelM90.glb";
    
    let btnRadioType1 = document.getElementById('btn-radio-type-1');
    let btnRadioType2 = document.getElementById('btn-radio-type-2');
    let btnRadioType3 = document.getElementById('btn-radio-type-3');
    
    let btnRadioPosition1 = document.getElementById('btn-radio-position-1');
    let btnRadioPosition2 = document.getElementById('btn-radio-position-2');
    
    const modelGenerator = new ModelGenerator(viewer, height);

    const target = modelGenerator.target(9.370023262377668, 48.81836398378254);
    const offset = modelGenerator.offset(-90, -100, 45);


    modelGenerator.generateSimpleModel(urlGrass, solarPanels);
    modelGenerator.generateModelById(urlPanel, solarPanels);

    btnRadioType2.onclick = function () {
        if (btnRadioType2.getAttribute("checked") == null) {
            btnRadioType2.setAttribute("checked", "true");
            btnRadioType2.checked = true;
            btnRadioType3.removeAttribute("checked");
            btnRadioType3.checked = false;
            btnRadioType1.removeAttribute("checked");
            btnRadioType1.checked = false;
            if (grassForPanel == false) {
                grassForPanel = true;
                console.log(grassForPanel);
                modelGenerator.removeAllEntities();
                modelGenerator.generateModelById("./data/verticalPanelM90.glb", solarPanels);
                modelGenerator.generateSimpleModel(urlGrass, solarPanels);
            } else {
                modelGenerator.removeEntitiesById();
                modelGenerator.generateModelById("./data/verticalPanelM90.glb", solarPanels);
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
            if (grassForPanel == false) {
                grassForPanel = true;
                console.log(grassForPanel);
                modelGenerator.removeAllEntities();
                modelGenerator.generateModelById("./data/groundPanelM90.glb", solarPanels);
                modelGenerator.generateSimpleModel(urlGrass, solarPanels);
            } else {
                modelGenerator.removeEntitiesById();
                modelGenerator.generateModelById("./data/groundPanelM90.glb", solarPanels);
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
            if (grassForPanel) {
                grassForPanel = false
                modelGenerator.removeAllEntities();
                modelGenerator.generateSimpleModel("./data/agiSolarGrass.glb", agriSolarLocation);
            }
        }
    };


    btnRadioPosition1.onclick = function () {
        if (btnRadioPosition1.getAttribute("checked") == null) {
            btnRadioPosition1.setAttribute("checked", "true");
            btnRadioPosition1.checked = true;
            btnRadioPosition2.removeAttribute("checked");
            btnRadioPosition2.checked = false;
            const target = modelGenerator.target(9.370023262377668, 48.81836398378254)
            viewer.scene.camera.lookAt(target, offset);
        }
    };

    btnRadioPosition2.onclick = function () {
        if (btnRadioPosition2.getAttribute("checked") == null) {
            btnRadioPosition2.setAttribute("checked", "true");
            btnRadioPosition2.checked = true;
            btnRadioPosition1.removeAttribute("checked");
            btnRadioPosition1.checked = false;
            const target = modelGenerator.target(9.379149543759475, 48.792965757926986)
            viewer.scene.camera.lookAt(target, offset);
        }
    };

    viewer.scene.camera.lookAt(target, offset);
}
