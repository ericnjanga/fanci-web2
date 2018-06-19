
class Geoloc {
  constructor() {
    this.geolocation = {
      on        : null,
      msg       : 'Loading your the map'
    }
  }//cons


  /**
   * Get geolocation data:
   * -> Keep setting OFF if feature is not available
   * -> set setting ON if: 
   * --> current position is returned
   * --> an error occurs while retriving data
   * (Always update message in any case)
   */
  static getValue() {
    let geolocation = { ...this.geolocation};
    return new Promise((resolve, reject)=>{
      if (navigator.geolocation) {
        geolocation.on = true; 
        navigator.geolocation.getCurrentPosition((position)=>{
            geolocation.on = true;
            geolocation.currPosition = position; 
            resolve(geolocation);
          },
          (err)=>{
            geolocation.on = false;
            geolocation.msg = `ERROR(${err.code}): ${err.message}`;
            resolve(geolocation);
          },
          {timeout:30000}
        );
      } else {
        geolocation.on = false;
        geolocation.msg = 'Geolocation is not supported on your device... Map cannot work, sorry';
        resolve(geolocation);
      }
    });// [end] new Promise
  }// [end] getValue

  /**
   * Return a simple object with 'lat', 'lng'
   */
  static getPosition(geolocObj) {
    return {
      lat : geolocObj.currPosition.coords.latitude,
      lng : geolocObj.currPosition.coords.longitude
    }
  }
}// [end] Geoloc

export default Geoloc;




