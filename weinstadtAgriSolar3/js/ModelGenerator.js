class ModelGenerator {

   constructor(viewer, height) {
      this.viewer = viewer;
      this.height = height;
      this.panelIdArray = [];
   };

   target = (lon, lat) => {
      return Cesium.Cartesian3.fromDegrees(lon, lat, this.height + 10);
   };

   removeEntitiesById = () => {
      this.panelIdArray.forEach(element => {
         console.log(element + 'remove');
         this.viewer.entities.removeById(element);
      });
   };

   removeAllEntities = () => {
      console.log('All elements deleted');
      this.viewer.entities.removeAll();
   };

   offset = (x, y, z) => {
      return new Cesium.Cartesian3(x, y, z);
   };

   createModel = (x, y, url, id) => {
      const position = Cesium.Cartesian3.fromDegrees(x, y, this.height);
      this.viewer.entities.add({
         name: url,
         position: position,
         model: {uri: url},
         id: id
      });
   };

   generateModelById = (urlPanel, solarPanelLocation) => {
      this.panelIdArray = []
      for (let i = 0; i < solarPanelLocation.features.length; ++i) {
         const lon = solarPanelLocation.features[i].properties.lon;
         const lat = solarPanelLocation.features[i].properties.lat;
         let id = 'panel' + i;
         this.createModel(lon, lat, urlPanel, id);
         this.panelIdArray.push(id)
      };
   };

   generateSimpleModel = (urlGrass, grassLocation) => {
      for (let i = 0; i < grassLocation.features.length; ++i) {
         const lon = grassLocation.features[i].properties.lon;
         const lat = grassLocation.features[i].properties.lat;
         this.createModel(lon, lat, urlGrass);
      };
   };

};
export default ModelGenerator;