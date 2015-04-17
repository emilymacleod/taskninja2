'use strict'

app.factory("Kudo", function(FURL, $firebase) {

    var ref = new Firebase(FURL);

    var Kudo = {
        kudos: function(taskID) {
            return $firebase(ref.child('kudos').child(taskID)).$asArray();
        },

        addKudos: function(taskId, kudo) {
            var task_kudos = this.kudos(taskId);
            kudo.datetime = Firebase.ServerValue.TIMESTAMP;

            if(task_kudos) {
                return task_kudos.$add(kudo);

            }
        }

    };

    return Kudo;

});