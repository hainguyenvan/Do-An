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
var ROOT_API = 'http://192.168.109.134:3002/api';
var API_GET_CERTIFICATE_BY_CODE = ROOT_API + '/accounts';

var app = angular.module('appCertificate', []);
app.controller('ctrlCertificate', function ($scope, $http) {

	$scope.init = function () {
		$scope.certificateCode = '';
	}

	$scope.getCertificateByCode = function () {
		console.log('Certificate code : ', $scope.certificateCode);
		$scope.certificate = {
			studentImg: 'https://www.nssi.com/media/wysiwyg/images/2.jpg',
			code: '20120909',
			title: 'Bằng TốT Nghiệp',
			studentName: 'Nguyễn Văn Hải',
			dateOfBirth: '08/09/1994',
			yearOfGraduation: '2018',
			degreeClassification: 'Khá',
			modeOfStudy: 'Chính Quy',
			date: '01/12/2018',
			author: 'Lê Minh Sơn',
			strStatusPublic: 'Đang phát hành'
		}
		$('#myModal').modal();
		// var body = {
		// 	code: $scope.certificateCode,
		// }
		// $http({
		// 	url: API_ADD_CANDIDATE,
		// 	method: "POST",
		// 	data: body
		// }).then(function (res) {
		// 	// success
		// 	$scope.getCandidates();
		// }, function (err) {
		// 	// failed
		// 	console.log('Failed !', err);
		// });
	}
});