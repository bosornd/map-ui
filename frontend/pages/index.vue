<template>
  <v-container fluid fill-height>
    <div id="map"></div>
  </v-container>
</template>

<script>
export default {
  mounted(){
    const map =  new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.25, lng: -80.85 },
        zoom: 16
    });

    map.addListener('idle', function(){
      // remove all
      map.data.forEach(function(feature){
        map.data.remove(feature);
      });

      const bounds = map.getBounds();
      const sw = bounds.getSouthWest();
      const ne = bounds.getNorthEast();

      const request = new XMLHttpRequest();
      const url = 'http://minikube/api/geodata/within?'
                    + 'left=' + sw.lng() + '&lower=' + sw.lat()
                    + '&right=' + ne.lng() + '&upper=' + ne.lat();
      request.open('GET', url);
      request.responseType = 'json';
      request.send();

      request.onload = function() {
        const geodata = request.response;
        for(var i = 0; i < geodata.length; i++){
          const latLng = new google.maps.LatLng({ lng: geodata[i].geometry.coordinates[0], lat:  geodata[i].geometry.coordinates[1] });
          map.data.add(new google.maps.Data.Feature({ geometry: latLng, properties: geodata[i].properties } ));
        }
      }
    });

    const infowindow = new google.maps.InfoWindow();
    map.data.addListener('click', function(e){
      const feature = e.feature;
      const name = feature.getProperty("name");
      const stars = feature.getProperty("stars");
      const review_count = feature.getProperty("review_count");
      const categories = feature.getProperty("categories");

      let content = '<div style="color:black"><b>' + name + '</b>(stars: ' + stars + ', reviews: ' + review_count + ')<br>categories: ';
      content += categories[0];
      for(var i = 1; i < categories.length; i ++)
        content += ', ' + categories[i];
      content += '</div>';

      infowindow.setPosition(e.latLng);
      infowindow.setContent(content);
      infowindow.open(map);
    });
  }
}
</script>

<style>
  #map {
    width: 100%;
    height: 100%;
  }
</style>
