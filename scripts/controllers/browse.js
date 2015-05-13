'use strict';

app.controller('BrowseController', function($scope, $routeParams, toaster, Task, Auth, Comment, Offer, Kudo) {

	$scope.searchTask = '';
	$scope.tasks = Task.all;

	$scope.signedIn = Auth.signedIn;
	
	$scope.listMode = true;

	$scope.user = Auth.user;

	if($routeParams.taskId) {
		var task = Task.getTask($routeParams.taskId).$asObject();
		$scope.listMode = false;
		setSelectedTask(task);
	}

	function setSelectedTask(task) {
		$scope.selectedTask = task;

		if($scope.signedIn()) {

			Offer.isOffered(task.$id).then(function(data) {
				$scope.alreadyOffered = data;
			});

			$scope.isTaskCreator = Task.isCreator;
			$scope.isOpen = Task.isOpen;

			$scope.isAssignee = Task.isAssignee;

			$scope.isCompleted = Task.isCompleted;
		}

		$scope.comments = Comment.comments(task.$id);

		Kudo.kudos(task.$id).then(function(data) {
			$scope.kudos = data;
			$scope.kudoScore = data.length;
		});

		$scope.offers = Offer.offers(task.$id);

		$scope.block = false;

		$scope.isOfferMaker = Offer.isMaker;
	};

	$scope.cancelTask = function(taskId) {
		Task.cancelTask(taskId).then(function() {
			toaster.pop('success', "This task is cancelled successfully.");
			$scope.total = '';
		});
	};

	$scope.addComment = function() {
		var comment = {
			content: $scope.content,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar
		};

		Comment.addComment($scope.selectedTask.$id, comment).then(function() {
			$scope.content = '';
		});
	};

	$scope.addKudo = function() {
		var kudo = {
			content: $scope.kudocontent,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar

		};

		Kudo.addKudo($scope.selectedTask.$id, kudo).then(function() {
			$scope.kudocontent = '';
				$scope.kudoScore = $scope.kudos.length;

		});
	// var test = Kudo.addKudo($scope.selectedTask.$id, kudo);
	// console.log(test);
	};

	$scope.makeOffer = function() {
		var offer = {
			total: $scope.total,
			uid: $scope.user.uid,
			name: $scope.user.profile.name,
			gravatar: $scope.user.profile.gravatar

		};

		Offer.makeOffer($scope.selectedTask.$id, offer).then(function() {
			toaster.pop('success', 'Your offer has been placed');
			$scope.total = '';
			$scope.block = true;
			$scope.alreadyOffered = true;

		});
	};

	$scope.cancelOffer = function(offerId) {
		Offer.cancelOffer($scope.selectedTask.$id, offerId).then(function() {
			toaster.pop('success', "Your offer has been cancelled.");

			$scope.alreadyOffered = false;
			$scope.block = false;
		});
	};

	$scope.acceptOffer = function(offerId, runnerId) {
		console.log(offerId, runnerId);
		Offer.acceptOffer($scope.selectedTask.$id, offerId, runnerId).then(function() {
			toaster.pop('success', "Offer is accepted.");

			Offer.notifyRunner($scope.selectedTask.$id, runnerId);
		});
	};

	$scope.completeTask = function(taskId) {
		Task.completeTask(taskId).then(function(){
			toaster.pop('success', "Congratulations! You have completed this task.");
		});
	};

});