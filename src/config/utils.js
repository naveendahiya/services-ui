export function ErrorMsg(status){
    let msg = '';
    switch(status){
        case 401:
          msg = 'Authorization required';
          break;
        case 500:
          msg = 'Internal Server Error';
          break;
        case 400:
          msg = "You've sent a bad request";
          break;
        default:
          msg = '';
          break;
      }
    return msg;
}


// export function GetCity(code, country){
//   var geocoder = new google.maps.Geocoder();
//
//   geocoder.geocode({ 'address': code + ',' + country }, function (result, status) {
//
//       var stateName = '';
//       var cityName = '';
//
//       var addressComponent = result[0]['address_components'];
//
//       // find state data
//       var stateQueryable = $.grep(addressComponent, function (x) {
//           return $.inArray('administrative_area_level_1', x.types) != -1;
//       });
//
//       if (stateQueryable.length) {
//           stateName = stateQueryable[0]['long_name'];
//
//           var cityQueryable = $.grep(addressComponent, function (x) {
//               return $.inArray('locality', x.types) != -1;
//           });
//
//           // find city data
//           if (cityQueryable.length) {
//               cityName = cityQueryable[0]['long_name'];
//           }
//       }
//   });
//   return [cityName, stateName];
// }