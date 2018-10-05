export class Config {
    public static API_ROOT = 'http://localhost:3002';
    public static TOKEN_KEY = 'CETIFICATIONS_WEB_ADMIN';
    public static EVENT_CLOSE = 'close';
    public static EVENT_SUBMIT = 'submit';
    public static DETAIL_ACCTION = 'detail';
    public static DELETE_ACTION = 'delete';
    public static EDIT_ACTION = 'edit';

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
}