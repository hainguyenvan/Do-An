export class Config {
    // Localhost
    // public static API_ROOT = 'http://localhost:3004';
    // Server
    public static API_ROOT = 'http://172.104.167.189:3004';
    public static SERVER_HOST = 'http://172.104.167.189:3004';
    public static TOKEN_KEY = 'CETIFICATIONS_WEB_ADMIN';
    public static OJBJECT_KEY = 'CETIFICATIONS_OBJECT_KEY';
    public static EVENT_CLOSE = 'close';
    public static EVENT_SUBMIT = 'submit';
    public static DETAIL_ACCTION = 'detail';
    public static DELETE_ACTION = 'delete';
    public static EDIT_ACTION = 'edit';
    public static SMART_CONTRACTS_ACTION = 'smartcontracts';


    public static LOADING = 'loading';
    public static ACTIVE = 'active';

    public static ACCOUNT = '0xCf3dD57B2D5764Ca66E0a600d718AD51942af21e';

    // Support
    public static API_ADD_SUPPORT = `${Config.API_ROOT}/addSupport`;
    public static API_UPDATE_SUPPORT = `${Config.API_ROOT}/updateSupport`;
    public static API_GET_ALL_SUPPORT = `${Config.API_ROOT}/getSupportByStatus`;
    public static API_DELETE_SUPPORT = `${Config.API_ROOT}/deleteSupport`;

    // Student
    public static API_ADD_STUDENT = `${Config.API_ROOT}/insertStudent`;
    public static API_UPDATE_STUDENT = `${Config.API_ROOT}/updateStudent`;
    public static API_GET_ALL_STUDENTS = `${Config.API_ROOT}/getAllStudents`;
    public static API_DELETE_STUDENTS = `${Config.API_ROOT}/updateStudentStatus`;
    public static API_GET_STUDENT_AVAILABLE = `${Config.API_ROOT}/getStudentAvailable`;
    public static API_GET_STUDENT_ACTIVE = `${Config.API_ROOT}/getStudentActive`;

    // Classroom
    public static API_ADD_CLASS_ROOM = `${Config.API_ROOT}/insertClassroom`;
    public static API_UPDATE_CLASS_ROOM = `${Config.API_ROOT}/updateClassroom`;
    public static API_DELETE_CLASS_ROOM = `${Config.API_ROOT}/updateStatusClassroom`;
    public static API_GET_ALL_CLASS_ROOM = `${Config.API_ROOT}/getAllClassroom`;
    public static API_GET_CLASS_ROOM_ACTIVE = `${Config.API_ROOT}/getClassroomActive`;
    public static API_GET_STUDENT_OF_CLAS_ROOM = `${Config.API_ROOT}/getStudentOfClassroom`;

    public static API_DESTROY_STUDENT_OF_CLASS_ROOM = `${Config.API_ROOT}/destroyStudentOfClassroom`

    // Study manager
    public static API_ADD_STUDY_MANAGER = `${Config.API_ROOT}/addStudyManager`;
    public static API_UPDATE_STUDY_MANAGER = `${Config.API_ROOT}/updateStudyManager`;

    // Upload
    public static API_UPLOAD = `${Config.SERVER_HOST}/upload`;

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