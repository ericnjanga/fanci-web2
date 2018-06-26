class AppEnv {
    constructor(envName) {
      this.env = envName;
      this.env = (envName==='prod') ? envName : 'dev'; //"dev" environment by default, otherwise "prod"
    } 
  
    getEnv() {
      return this.env;
    }
  }
  
  
  export default AppEnv;