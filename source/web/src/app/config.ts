export class Config {
    public static API_ROOT = 'http://localhost:3002';
    public static TOKEN_KEY = 'CETIFICATIONS_WEB_ADMIN';
    public static OJBJECT_KEY = 'CETIFICATIONS_OBJECT_KEY';
    public static EVENT_CLOSE = 'close';
    public static EVENT_SUBMIT = 'submit';
    public static DETAIL_ACCTION = 'detail';
    public static DELETE_ACTION = 'delete';
    public static EDIT_ACTION = 'edit';
    public static SMART_CONTRACTS_ACTION = 'smartcontracts';

    public static ACCOUNT = '0xCf3dD57B2D5764Ca66E0a600d718AD51942af21e';

    // Upload
    public static API_UPLOAD = `${Config.API_ROOT}/upload`;

    // Account
    public static API_LOGIN = `${Config.API_ROOT}/login`;
    public static API_GET_ALL_ACCOUNT = `${Config.API_ROOT}/getAllAccount`;
    public static API_ADD_ACCOUNT = `${Config.API_ROOT}/addAccount`;
    public static API_DELETE_ACCOUNT = `${Config.API_ROOT}/deleteAccount`;
    public static API_UPDATE_ACCOUNT = `${Config.API_ROOT}/updateAccount`;
    public static API_GET_INFO_ACCOUNT = `${Config.API_ROOT}/getInfoAccount`;

    // Position
    public static API_GET_ALL_POSITION = `${Config.API_ROOT}/getAllPosition`;
    public static API_INSERT_POSITION = `${Config.API_ROOT}/insertPosition`;
    public static API_UPDATE_POSITION = `${Config.API_ROOT}/updatePosition`;
    public static API_DELETE_POSITION = `${Config.API_ROOT}/deletePosition`;

    // Cetificate category
    public static API_GET_ALL_CETIFICATE_CATEGORY = `${Config.API_ROOT}/getAllCetificateCategory`;
    public static API_INSERT_CETIFICATE_CATEGORY = `${Config.API_ROOT}/insertCetificateCategory`;
    public static API_UPDATE_CETIFICATE_CATEGORY = `${Config.API_ROOT}/updateCetificateCategory`;
    public static API_DELETE_CETIFICATE_CATEGORY = `${Config.API_ROOT}/deleteCetificateCategory`;

    // Cetificate list
    public static API_GET_ALL_CETIFICATE_LIST = `${Config.API_ROOT}/getAllCetificateList`;
    public static API_INSERT_CETIFICATE_LIST = `${Config.API_ROOT}/insertCetificateList`;
    public static API_UPDATE_CETIFICATE_LIST = `${Config.API_ROOT}/updateCetificateList`;
    public static API_DELETE_CETIFICATE_LIST = `${Config.API_ROOT}/deleteCetificateList`;

    // Smart contracts
    public static API_UPDATE_STATUS_AUTHOR_SMART_CONTRACTS = `${Config.API_ROOT}/smartcontracts/updateStatusAuthor`;
    public static API_INSERT_AUTHOR_SMART_CONTRACTS = `${Config.API_ROOT}/smartcontracts/addAuthor`;

    public static API_INSERT_CERTIFICATE_SMAERT_CONTRACTS = `${Config.API_ROOT}/smartcontracts/addCertificate`;
    public static API_UPDATE_CERTIFICATE_SMART_CONTRACTS = `${Config.API_ROOT}/smartcontracts/updateCertificate`;


    public static API_GET_LOG_SMART_CONTRACTS = `${Config.API_ROOT}/smartcontracts/getDataChanegs`;
}