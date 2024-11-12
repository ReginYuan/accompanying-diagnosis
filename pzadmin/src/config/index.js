import configDev from './config.dev';

const env = import.meta.env.MODE;
let config = {};
switch (env) {
    // case 'production': {
    //     config = configProf;
    //     break;
    // }
    case 'development': {
        config = configDev;
        break;
    }
    // case 'test': {
    //     config = configTest;
    //     break;
    // }
    default: {
        break;
    }
}

export default Object.assign(config);
