describe("Observer", function() {

    it('should exists', function() {
        expect(observer).toBeDefined();
    });

});

describe("Extended object", function() {

    var testObserver,
        testEvent = {
            notifyMe: function notifyMe(data) {
                notified = true;
            }
        },
        notified = false;

    beforeEach(function() {

        testObserver = observer.extend({
            notify: function(data) {
                this.trigger('testEvent', data);
            }
        });
    });

    it('should bind an event', function () {
        expect(testObserver.subscribers.testEvent).toBeUndefined();
        testObserver.on('testEvent', testEvent.notifyMe);
        expect(testObserver.subscribers.testEvent).toBeDefined();
        expect(testObserver.subscribers.testEvent.length).toEqual(1);
    });

    it('should remove an event', function () {
        testObserver.on('testEvent', testEvent.notifyMe);
        expect(testObserver.subscribers.testEvent.length).toEqual(1);
        expect(testObserver.subscribers.testEvent).toBeDefined();

        testObserver.off('testEvent', testEvent.notifyMe);
        expect(testObserver.subscribers.testEvent.length).toEqual(0);
    });

    it('should trigger an event', function () {
        testObserver.on('testEvent', testEvent.notifyMe);
        expect(notified).toBeFalsy();
        testObserver.notify('test');
        expect(notified).toEqual(true);
    });

    it('should throw an error if triggered event does not exist', function () {
        testObserver.on('testEvent', testEvent.notifyMe);
        expect(function () {
            testObserver.trigger('eventxyz');
        }).toThrow();
    });

    it('should throw an error if removed event does not exist', function () {
        expect(function () {
            testObserver.off('eventxyz');
        }).toThrow();
    })


});