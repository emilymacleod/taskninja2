'use strict'

app.factory("Kudo", function(FURL, $firebase, $q) {

    var ref = new Firebase(FURL);

    var Kudo = {
        kudos: function(taskID) {

            var defer = $q.defer();

            
            $firebase(ref.child('kudos').child(taskID)).$asArray()
            .$loaded()
            .then(function(tasks) {                 
                    defer.resolve(tasks);
                }, function(err) {
                    defer.reject();
                });

            return defer.promise;

        },

        addKudo: function(taskId, kudo) {
            var defer = $q.defer();
            this.kudos(taskId).then(function(task_kudos) {
                kudo.datetime = Firebase.ServerValue.TIMESTAMP;
                if(task_kudos) {

                    defer.resolve(task_kudos.$add(kudo));
                }

            });

            return defer.promise;
           
        }

    };

    return Kudo;

});