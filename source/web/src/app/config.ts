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

    // Position
    public static API_GET_ALL_POSITION = `${Config.API_ROOT}/getAllPosition`;
}