function Helper() {
  const KEY = 'AIzaSyAwuhkKze-DtmUFqF6i-6mR_jpEmGrmCtA';
  function decode(encoded: any) {
    // array that holds the points

    var points = [];
    var index = 0,
      len = encoded.length;
    var lat = 0,
      lng = 0;
    while (index < len) {
      var b,
        shift = 0,
        result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63; //finds ascii                                                                                    //and substract it by 63
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      var dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      points.push({latitude: lat / 1e5, longitude: lng / 1e5});
    }
    return points;
  }
  const getDirections = async (startLoc: any, destinationLoc: any) => {
    try {
      //put your API key here.
      //otherwise, you'll have an 'unauthorized' error.
      let resp = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`,
      );
      let respJson = await resp.json();
      let points = decode(respJson.routes[0].overview_polyline.points);
      let coords = points.map((point, index) => {
        return {
          latitude: point.latitude,
          longitude: point.longitude,
        };
      });
      return coords;
    } catch (error) {
      return error;
    }
  };
  const getDistance = async (lat1: any, lng1: any, lat2: any, lng2: any) => {
    // Pass Latitude & Longitude of both points as a parameter
    try {
      var urlToFetchDistance =
      'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=' +
      lat1 +
      ',' +
      lng1 +
      '&destinations=' +
      lat2 +
      '%2C' +
      lng2 +
      '&key=' +
      KEY;

      let resp = await fetch(urlToFetchDistance)
      let respJson = await resp.json();
      return respJson.rows[0].elements[0].duration.text
    } catch (error) {
      return error;
    }
  };
  return {
    getDirections,
    getDistance
  };
}
export default Helper;
