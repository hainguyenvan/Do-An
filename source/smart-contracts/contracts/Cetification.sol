pragma solidity ^0.4.24;

contract Cetification {
    
    // Cấu trúc của một bằng tốt nghiệp
    struct Certificate {
        bytes32 code;
        bytes32 title; // Tên bằng tốt nghiệp
        bytes32 studentName; // Tên sinh viên
        bytes32 dataOfBirth; // Ngày tháng năm sinh
        uint yearOfGraduation; // Năng tốt nghiệp
        bytes32 degreeClassification; // Loại bằng
        bytes32 modeOfStudy; // Hình thức đào tạo
        bytes32 date; // Ngày phát hành
        bytes32 author; // Người cấp bằng
        uint updateBy; // Id của người sửa dữ liệu
        uint status; // Trang thai bang,
        bytes32 timeUpdate;
        bytes32 studentSign;
    }

    // 0: Active, -1: Delete
    struct Author {
        string id;
        string name;
        string sign;
        string status;
    }

    // Lưu trữ số lượng người có quyền phát hành bằng tốt nghiệp
    uint public authorsCount;

    // Lưu trữ số lượng cetification
    uint public certificatesCount;

    // Mảng các bằng tốt nghiệp
    mapping (uint => Certificate) public certificates;

    // Mảng những người được cấp quyền để phát hành các chứng chỉ
    mapping (uint => Author) public authors;

    // Contructor
    constructor () public {
        addAuthor("GV001", "hainv", "0x0000000000112121212121212");
    }

    event eventUpdateCertificate(
        bytes32 _code, 
        bytes32 _title, 
        bytes32 _studentName, 
        bytes32 _dataOfBirth, 
        uint _yearOfGraduation, 
        bytes32 _degreeClassification, 
        bytes32 _modeOfStudy,
        bytes32 _date, 
        bytes32 _author, 
        uint _updateBy, 
        uint _status,
        bytes32 _timeUpdate,
        bytes32 _studentSign
    );

    // Add author
    function addAuthor(string _id,string _name, string _sign) public returns (bool) {
        authorsCount ++;
        authors[authorsCount] = Author(_id, _name, _sign,"0");
        return true;
    }

    // Delete author
    function updateStatusAuthor(uint index,string status) public returns (bool){
        authors[index].status = status;
    }

    // Add cetificates
    function addCertificate(bytes32 code, bytes32 title, 
        bytes32 studentName, bytes32 dataOfBirth ,
        uint yearOfGraduation, bytes32 degreeClassification, 
        bytes32 modeOfStudy, bytes32 date, 
        bytes32 author, uint updateBy,bytes32 timeUpdate, bytes32 studentSign) public
    {
        certificatesCount ++;
        certificates[certificatesCount] = Certificate(code, title, studentName, dataOfBirth , yearOfGraduation, degreeClassification, modeOfStudy, date, author, updateBy,1,timeUpdate, studentSign);
        emit eventUpdateCertificate(code, title, studentName, dataOfBirth , yearOfGraduation, degreeClassification, modeOfStudy, date, author, updateBy,1,timeUpdate, studentSign);
    }

    // Update cetificates
     function updateCertificate(uint index, bytes32 title, 
        bytes32 studentName, bytes32 dataOfBirth ,
        uint yearOfGraduation, bytes32 degreeClassification, 
        bytes32 modeOfStudy, bytes32 date, 
        bytes32 author, uint updateBy, uint status,bytes32 timeUpdate, bytes32 studentSign) public
    {
        certificates[index].title = title;
        certificates[index].studentName = studentName;
        certificates[index].dataOfBirth = dataOfBirth;
        certificates[index].yearOfGraduation = yearOfGraduation;
        certificates[index].degreeClassification = degreeClassification;
        certificates[index].modeOfStudy = modeOfStudy;
        certificates[index].date = date;
        certificates[index].author = author;
        certificates[index].updateBy = updateBy;
        certificates[index].status = status;
        certificates[index].timeUpdate = timeUpdate;
         certificates[index].studentSign =  studentSign;
        emit eventUpdateCertificate(certificates[index].code, title, studentName, dataOfBirth , yearOfGraduation, degreeClassification, modeOfStudy, date, author, updateBy,status,timeUpdate,studentSign);
    }
}