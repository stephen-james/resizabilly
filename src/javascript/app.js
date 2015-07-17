var Draggabilly = require('draggabilly');
var _ = require('underscore');

var document = window.document;

var Resizey = function Resizey(element, options) {
    // querySelector if string
    this.element = typeof element == 'string' ?
        document.querySelector(element) : element;

    // options
    this.options = _.extend({}, this.constructor.defaults);
    this.option(options);

    this._create();
};

Resizey.defaults = {};

/**
 * set options
 * @param {Object} opts
 */
Resizey.prototype.option = function (opts) {
    _.extend(this.options, opts);
};

Resizey.prototype._create = function () {
    // properties
    var HANDLE_LIST = ['top-left', 'top-right', 'bottom-right', 'bottom-left'];
    var self = this;

    self.handles = {};

    _.each(HANDLE_LIST, function(handleName) {
        var handle = document.createElement('div');
        handle.className = 'rzb-resize-handle rzb-hidden';
        handle.setAttribute('data-Resizey-handle', handleName);

        document.body.appendChild(handle);

        self.handles[handleName] = handle;
    });

    this._bindEvents();
};

Resizey.prototype.allHandles = function(fn) {
    _.each(this.handles, function(el) {
        fn.call(this, el);
    });
};

Resizey.prototype.toggleHidden = function(el) {
    console.log('toggle hidden');
    if (el.className.match(/rzb-hidden/)) {
        el.className = el.className.replace(/(?:\s)?rzb-hidden/, '');
    } else {
        el.className = el.className + ' rzb-hidden';
    }
};

Resizey.prototype._bindEvents = function() {
    var self = this;

    this.element.addEventListener('mouseup', function() {
        console.log('mouse up');
        self.allHandles(self.toggleHidden);
    });
};

Resizey.prototype.disposeHandle = function(el) {
    var handleName = el.getAttribute('data-Resizey-handle');

    this.handles[handleName] = null;

    document.body.removeChild(el);
};

Resizey.prototype.dispose = function () {
    this.allHandles(disposeHandle);
};

var resizable = new Resizey('.resizable');
