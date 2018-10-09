pragma solidity ^0.4.24;

contract Cetification {
    
    // Cấu trúc của một bằng tốt nghiệp
    struct Certificate {
        bytes32 id;
        bytes32 title; // Tên bằng tốt nghiệp
        bytes32 studentName; // Tên sinh viên
        bytes32 dataOfBirth; // Ngày tháng năm sinh
        uint yearOfGraduation; // Năng tốt nghiệp
        bytes32 degreeClassification; // Loại bằng
        bytes32 modeOfStudy; // Hình thức đào tạo
        bytes32 timeCreate; // Ngày phát hành
        bytes32 author; // Người cấp bằng
        uint authorId; // Id của người sửa dữ liệu
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
    function editCertificate(bytes32 id, bytes32 title, 
        bytes32 studentName, bytes32 dataOfBirth ,
        uint yearOfGraduation, bytes32 degreeClassification, 
        bytes32 modeOfStudy, bytes32 timeCreate, 
        bytes32 author, uint authorId) public
    {
        certificatesCount ++;
        certificates[certificatesCount] = Certificate(id, title, studentName, dataOfBirth , yearOfGraduation, degreeClassification, modeOfStudy, timeCreate, author, authorId);
    }


    // // Vote
    // function vote(uint _candidateId) public {
    //     // require that they haven't voted before
    //     require(!voters[msg.sender]);

    //     // require a valid candidate
    //     require(_candidateId > 0 && _candidateId <= candidatesCount);

    //     voters[msg.sender] = true;

    //     // update candidate vote count
    //     candidates[_candidateId].voteCount ++;

    //     // trigger voted event
    //     // emit votedEvent(_candidateId);
    // }
}