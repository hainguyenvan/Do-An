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
// Localhost
// var ROOT_API = 'http://localhost:3004';
// Server
var ROOT_API = 'http://172.104.167.189:3004';
var API_GET_CERTIFICATE_BY_CODE = ROOT_API + '/getCertificateByCode';
var API_GET_SUPPORT = ROOT_API + '/getSupportByStatus';

var app = angular.module('appCertificate', []);
app.controller('ctrlCertificate', function ($scope, $http) {

	$scope.init = function () {
		$scope.certificateCode = '';
		$scope.messageWarning = '';
		$scope.type = '0';
		$scope.certificate = {};
		$scope.histtoryList = [];
		$scope.supportList = [];
		$scope.getSupport();
	}

	$scope.getSupport = function () {
		var body = {
			status: 0
		}
		// 0: Get detail certificate
		// 1: Get history edit certificate
		$http({
			url: API_GET_SUPPORT,
			method: "POST",
			data: body
		}).then(function (res) {
			// success
			if (res.data.status == 200) {
				let dataList = res.data.data;
				let dataSource = [];
				for (let i = 0; i < dataList.length; i++) {
					if ((i + 1) % 2 == 0) {
						let itemList = [];
						itemList.push(dataList[i - 1]);
						itemList.push(dataList[i]);
						dataSource.push(itemList);
					}
					if (i == dataList.length - 1 && ((dataList.length - 1) % 2 == 0)) {
						let itemList = [];
						itemList.push(dataList[i]);
						dataSource.push(itemList);
					}
				}
				$scope.supportList = dataSource;
			}
		}, function (err) {
			// failed
			console.log('Failed !', err);
			$scope.messageWarning = 'Đã xảy ra lỗi trong quá lấy thông tin';
			$('#myModalWarning').modal();
		});
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
		// 0: Get detail certificate
		// 1: Get history edit certificate
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
			if ($scope.type == '0') {
				$scope.certificate = res.data.data;
				$scope.certificate.studentImg = $scope.certificate.student.img;
				$scope.certificate.dateOfBirth = $scope.certificate.dataOfBirth;
				$scope.certificate.strStatusPublic = $scope.certificate.status == 1 ? 'Đang phát hành ' : 'Ngừng phát hành';
				if ($scope.certificate.txtLimit == undefined) {
					$scope.certificate.strLimit = '';
				} else {
					$scope.certificate.strLimit = $scope.certificate.txtLimit == 'VO_HAN' ? 'Vô hạn' : 'Có hạn';
				}
				$('#myModalCertificate').modal();
			} else {
				$scope.historyList = res.data.data;
				$scope.historyList.forEach(item => {
					if (item.txtLimit == undefined) {
						item.strTxtLimit = ''
					} else {
						item.strTxtLimit = item.txtLimit == 'VO_HAN' ? 'Vô hạn' : 'Có hạn';
					}
					item.strStatusPublic = item.status == 1 ? 'Đang phát hành ' : 'Ngừng phát hành';
				});
				console.log('data : ', $scope.historyList);
				$('#myModalHistory').modal();
			}

		}, function (err) {
			// failed
			console.log('Failed !', err);
			$scope.messageWarning = 'Đã xảy ra lỗi trong quá lấy thông tin';
			$('#myModalWarning').modal();
		});
	}
});