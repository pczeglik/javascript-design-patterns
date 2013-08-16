var observer = {

    on: function(event, callback) {
        if (typeof this.subscribers[event] === 'undefined') {
            this.subscribers[event] = [];
        }
        this.subscribers[event].push(callback);
    },

    off: function(event, callback) {
        var i;

        if (typeof this.subscribers[event] === 'undefined') {
            throw new Error('Event: ' + event + ' does not exist');
        }

        i = this.subscribers[event].length - 1;

        for (; i >= 0; i -= 1) {
            if (this.subscribers[event][i] === callback) {
                this.subscribers[event].splice(i, 1);
            }
        }
    },

    trigger: function(event, data) {
        var i;

        if (typeof this.subscribers[event] === 'undefined') {
            throw new Error('Cannot trigger: ' + event + ' because it does not exist');
        }

        i = this.subscribers[event].length - 1;

        for (; i >= 0; i -= 1) {
            if (typeof this.subscribers[event][i] === 'function') {
                this.subscribers[event][i](data);
            }
        }
    },

    extend: function(obj) {
        var i;

        for (i in this) {
            obj[i] = this[i];
        }
        obj.subscribers = {};

        return obj;
    }

};