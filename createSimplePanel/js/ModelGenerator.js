class ModelGenerator {

   constructor(viewer, numColumn, numRow, lonIncrement, latIncrement, initLon, initLan, height) {
      this.viewer = viewer;
      this.numColumn = numColumn;
      this.numRow = numRow;
      this.lonIncrement = lonIncrement;
      this.latIncrement = latIncrement;
      this.initLon = initLon;
      this.initLan = initLan;
      this.height = height
      this.panelIdArray = []
   }

   get target() {
      return Cesium.Cartesian3.fromDegrees(
         this.initLon + Math.round(this.numColumn / 2) * this.lonIncrement,
         this.initLan + Math.round(this.numRow / 2) * this.latIncrement,
         this.height + 10
      );
   };

   removeAllEntities = () => {
      this.panelIdArray.forEach(element => {
         console.log(element + 'remove');
         this.viewer.entities.removeById(element);
      });
      
   }

   offset = (x, y, z) => {
      return new Cesium.Cartesian3(
         x, y, z
      );
   };

   createModel = (x, y, url, id) => {
      const position = Cesium.Cartesian3.fromDegrees(x, y, this.height);
      // console.log(x, y)
      // console.log('height', this.height)
      // console.log('url', url)
      this.viewer.entities.add({
         name: url,
         position: position,
         model: {
            uri: url,
         },
         id: id
      });
   };

   generatePanelModel = (urlPanel) => {
      this.panelIdArray = []
      for (let i = 0; i < this.numColumn; ++i) {
         const lon = this.initLon + i * this.lonIncrement;
         for (let j = 0; j < this.numRow; ++j) {
            const lat = this.initLan + j * this.latIncrement;
            let id = 'panel' + i + j 
            console.log(id);
            this.createModel(lon, lat, urlPanel, id);
            this.panelIdArray.push(id)
         };
      };
   };

   generateTreeModel = (urlTree) => {
      for (let i = 0; i < this.numColumn; ++i) {
         const lon = this.initLon + i * this.lonIncrement;
         for (let j = 0; j < this.numRow; ++j) {
            const lat = this.initLan + j * this.latIncrement;
            this.createModel(lon - 0.00007, lat, urlTree);
            this.createModel(lon - 0.00007, lat + 0.000025, urlTree);
            this.createModel(lon - 0.00007, lat + 0.00005, urlTree);
         };
      };
      // return this.viewer
   };



};

export default ModelGenerator;