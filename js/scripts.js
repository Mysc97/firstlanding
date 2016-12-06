$(document).ready(function() {
	$.backstretch("img/background.jpg");

	$("#update-msg").fitText(2.5);
	$("h1").fitText(0.7);
});

var viewModel = {
	username: ko.observable(''),
	flags: [
		'Albania',
		'Barbados',
		'Belgium',
		'Brazil',
		'Central_African_Republic',
		'Colombia',
		'Denmark',
		'Ethiopia',
		'France',
		'Germany',
		'Greece',
		'Malta',
		'Netherlands',
		'New_Zealand',
		'Poland',
		'Portugal',
		'Russian_Federation',
		'Saudi_Arabia',
		'South_Korea',
		'Sweden',
		'Switzerland',
		'Thailand',
		'United_Kingdom',
		'United_States_of_America'
	],
	resources: ko.observableArray([
		{
			name: 'Gold',
			icon: 'img/gold-icon.png',
			amount: ko.observable(0)
		},
		{
			name: 'Chips',
			icon: 'img/chip-icon.png',
			amount: ko.observable(0)
		},
		{
			name: 'Stone, Woods, Silver, Ore',
			icon: 'img/wood-icon.png',
			amount: ko.observable(0)
		}
	]),
	updateMsg: ko.observable(''),
	overlay: ko.observable(false),
	confirmModal: ko.observable(false),
	loadingModal: ko.observable(false),
	progresssInt: ko.observable(0),
	progressPercentage: ko.observable(''),
	humanModal: ko.observable(false),
	getResources: function() {
		var self = this;
		return self.resources();
	},
	updateMessage: function() {
		var self = this;
		$('#update-msg').fadeOut('fast', function() {
			var resource = chance.pickone(self.resources());
			var flag = chance.pickone(self.flags);
			self.updateMsg('<img height="20px" src="img/flags/' + flag +'.png" class="flag-icon" /> ' + chance.ip() + ' generated ' + chance.integer({min: 11111, max: 999999})  +' <img height="15px" src="' + resource.icon +'" /> ' + resource.name + '!');
			$('#update-msg').fadeIn('fast').fadeOut('fast').fadeIn('fast').fadeOut('fast').fadeIn('fast');
		});
		
	},
	generatorReady: function() {
		var self = this;
		for (var i = 0; i <= self.resources().length - 1; i++) {
			if(self.resources()[i].amount() != 0) {
				return true;
			}
		}
		return false;
	},
	startGenerator: function(data, event) {
		var self = this;
		var resources = false;

		for (var i = 0; i <= self.resources().length - 1; i++) {
			if(self.resources()[i].amount() != 0) {
				resources = true;
			}
		}

		if(!resources) {
			swal('Error!', 'Please make sure that you enter a number for atleast one resource..', 'error');
			return false;
		}

		if(self.username() == '') {
			swal('Error!', 'Please enter your game of war username...', 'error');
			return false;
		}

		self.overlay(true);
		self.confirmModal(true);
	},
	cancelConfirmModal: function() {
		var self = this;
		self.overlay(false);
		self.confirmModal(false);
	},
	confirmItems: function() {
		var self = this;
		self.confirmModal(false);
		self.loadingModal(true);
		var progressInterval = setInterval(function() {
			var current_progress = self.progresssInt();
			if(current_progress >= 100) {
				clearInterval(progressInterval);
				self.loadingModal(false);
				self.humanModal(true);
			}
			self.progresssInt(current_progress + 1);
			self.progressPercentage(self.progresssInt() + '%');
		}, chance.integer({min: 30, max: 65}));
	},
	verifyConnection: function() {
		call_locker();
	}
};

ko.applyBindings(viewModel);

viewModel.updateMessage();

setInterval(function() {
	viewModel.updateMessage();
}, chance.integer({min: 2500, max: 5500}));