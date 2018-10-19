(function ($, document, window) {

	$(document).ready(function () {

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function () {
			$(".mobile-navigation").slideToggle();
		});
	});

	$(window).load(function () {

	});

})(jQuery, document, window);



// AngularJS
var ROOT_API = 'http://localhost:3002';
var API_GET_CERTIFICATE_BY_CODE = ROOT_API + '/getCertificateByCode';

var app = angular.module('appCertificate', []);
app.controller('ctrlCertificate', function ($scope, $http) {

	$scope.init = function () {
		$scope.certificateCode = '';
		$scope.messageWarning = '';
		$scope.type = '0';
		$scope.certificate = {};
	}

	$scope.getCertificateByCode = function () {
		if ($scope.certificateCode == undefined || $scope.certificateCode == null || $scope.certificateCode == '') {
			$scope.messageWarning = 'Bạn chưa nhập mã bằng tốt nghiệp';
			$('#myModalWarning').modal();
			return;
		}
		if (Number($scope.certificateCode).toString() == 'NaN' || Number($scope.certificateCode) == 0) {
			$scope.messageWarning = 'Mã bằng tốt nghiệp không hợp lệ. Mã bằng tốt nghiệp chỉ chứa các ký tự số';
			$('#myModalWarning').modal();
			return;
		}
		var body = {
			code: $scope.certificateCode,
			type: Number($scope.type)
		}
		$http({
			url: API_GET_CERTIFICATE_BY_CODE,
			method: "POST",
			data: body
		}).then(function (res) {
			// success
			if (res.data.status != 200 || res.data.data == undefined) {
				$scope.messageWarning = 'Mã bằng tốt nghiệp ' + $scope.certificateCode + ' không tồn tại';
				$('#myModalWarning').modal();
				return;
			}
			$scope.certificate = res.data.data;
			$scope.certificate.studentImg = $scope.certificate.student.img;
			$scope.certificate.dateOfBirth = $scope.certificate.dataOfBirth;
			$scope.certificate.strStatusPublic = $scope.certificate.status == 1 ? 'Đang phát hành ' : 'Ngừng phát hành';
			$('#myModalCertificate').modal();
		}, function (err) {
			// failed
			console.log('Failed !', err);
			$scope.messageWarning = 'Đã xảy ra lỗi trong quá lấy thông tin';
			$('#myModalWarning').modal();
		});
	}
});