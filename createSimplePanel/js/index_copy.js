'use strict'; 

function startup(Cesium) {
    const viewer = new Cesium.Viewer("cesiumContainer");

    function createModel(url, x, y, height) {
        const position = Cesium.Cartesian3.fromDegrees(x, y, height);
        viewer.entities.add({
            name: url,
            position: position,
            model: {
                uri: url,
            },
        });
    }

    const column = 8;
    const row = 11;
    const lonIncrement = 0.00015;
    const latIncrement = 0.00008;
    const initLon = 9.3916132322;
    const initLan = 48.8205517603;
    const height = 0;

    const urlPanel = "./data/groundPanel.glb";
    const urlTree = "./data/Tree.glb";
    console.log(urlPanel);

    for (let i = 0; i < column; ++i) {
        const lon = initLon + i * lonIncrement;
        for (let j = 0; j < row; ++j) {
            const lat = initLan + j * latIncrement;
            console.log(lon, initLan, height);
            createModel(urlPanel, lon, lat, height);
            createModel(urlTree, lon - 0.000075, lat, height);
            createModel(urlTree, lon - 0.000075, lat + 0.000025, height);
            createModel(urlTree, lon - 0.000075, lat + 0.00005, height);
        }
    }


    const target = Cesium.Cartesian3.fromDegrees(
        initLon + 4 * lonIncrement,
        initLan + 6 * latIncrement,
        height + 10
    );

    console.log(target);
    const offset = new Cesium.Cartesian3(
        40, 50, 30
    );

    viewer.scene.camera.lookAt(target, offset);
}
if (typeof Cesium !== 'undefined') {
    window.startupCalled = true;
    startup(Cesium);
}