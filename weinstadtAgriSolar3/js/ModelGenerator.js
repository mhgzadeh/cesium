class ModelGenerator {

   constructor(viewer) {
      this.viewer = viewer;
      this.height = 400;
      this.panelIdArray = [];
   };

   target = (lon, lat) => {
      return Cesium.Cartesian3.fromDegrees(lon, lat, this.height + 10);
   };
   
   offset = (x, y, z) => {
      return new Cesium.Cartesian3(x, y, z);
   };

   removeEntitiesById = () => {
      this.panelIdArray.forEach(element => {
         this.viewer.entities.removeById(element);
      });
   };

   removeAllEntities = () => {
      console.log('All elements deleted');
      this.viewer.entities.removeAll();
   };

   createModel = (lon, lat, alt, url, id) => {
      const position = Cesium.Cartesian3.fromDegrees(lon, lat, alt);
      this.viewer.entities.add({
         name: url,
         position: position,
         model: {uri: url},
         id: id
      });
   };

   generateModelById = (objectUrl, objectLocation) => {
      this.panelIdArray = []
      for (let i = 0; i < objectLocation.features.length; ++i) {
         const lon = objectLocation.features[i].properties.lon;
         const lat = objectLocation.features[i].properties.lat;
         const alt = objectLocation.features[i].properties.alt1;
         console.log(lon, lat, alt);
         let id = 'panel' + i;
         this.createModel(lon, lat, alt, objectUrl, id);
         this.panelIdArray.push(id)
      };
   };

   generateSimpleModel = (objectUrl, objectLocation, panelName) => {
      console.log(panelName);
      for (let i = 0; i < objectLocation.features.length; ++i) {
         const lon = objectLocation.features[i].properties.lon;
         const lat = objectLocation.features[i].properties.lat;
         const alt = objectLocation.features[i].properties.alt1;
         this.createModel(lon, lat, alt, objectUrl);
      };
   };

};
export default ModelGenerator;