import * as moment from 'moment';


export class ThirdParty {
    public static convertTimestampToDate(timestamp) {
        if (timestamp == undefined || timestamp == null) {
            return '';
        }
        let data = moment(timestamp).format('YYYYMMDD');
        let y = data.substring(0, 4);
        let m = data.substring(4, 6);
        let d = data.substring(6, 8);
        return (y + '-' + m + '-' + d);
    }

    public static isNull(data) {
        if (data == undefined || data == null) {
            return true;
        }
        return false;
    }
}