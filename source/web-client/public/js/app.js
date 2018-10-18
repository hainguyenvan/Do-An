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
		$scope.certificate = {};
	}

	$scope.getCertificateByCode = function () {
		console.log('Certificate code : ', $scope.certificateCode);
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