(function () {
    // Sample debug events
    window.addEventListener('exit', function (e) { console.log('DEBUG EXIT EVENT -> ' + e.data); });
    window.addEventListener('counter', function (e) { console.log('DEBUG COUNTER EVENT -> ' + e.data); });
    window.addEventListener('startTimer', function (e) { console.log('DEBUG START TIMER EVENT -> ' + e.data); });
    window.addEventListener('stopTimer', function (e) { console.log('DEBUG STOP TIMER EVENT -> ' + e.data); });
    
    var _logOfConsole = [];
    var _tmpLog = console.debug;
    var _isStarted = false;
    
    console.debug = function() {
        var param = arguments[0];
        if (param.indexOf('[studio.sdk] Exit') != -1) {
            
            if (getEventType(param) == 'invoked.') {
                dispatchEvent('exit', getEventName(param));
            }
        } else if (param.indexOf('[studio.sdk] Counter') != -1) {
            if (getEventType(param) == 'invoked.') {
                dispatchEvent('counter', getEventName(param));
            }
        } else if (param.indexOf('[studio.sdk] Timer') != -1) {

            if (getEventType(param) == 'started.') {
                dispatchEvent('startTimer', getEventName(param));
            } else if (getEventType(param) == 'stopped.') {
                dispatchEvent('stopTimer', getEventName(param));
            }
        }

        return _tmpLog.apply(console, arguments);
    };
    
    function dispatchEvent (type, name) {
        if (!_isStarted) return;
        
        var data = {type:type, name:name};
        
        var e = new Event(type);
        window.dispatchEvent(e);
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            console.log(xhr.readyState);
            if (xhr.readyState==4 && xhr.status==200) {
                //document.getElementById("myDiv").innerHTML=xhr.responseText;
            }
        }
        xhr.open('POST','http://127.0.0.1:8081',true)
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send('data=' + JSON.stringify(data));
    }

    function getEventName (evtOutput) {
        var start = evtOutput.indexOf(' "') + 2;
        var end = evtOutput.indexOf('" ' );
        var output = evtOutput.substr(start, end - start);
        
        return output;
    }

    function getEventType (evtOutput) {
        var arr = evtOutput.split(' ');
        return arr[arr.length - 1];
    }
    
    window.exDebug = function (metrics) {
         setTimeout(function() {
            var firstChild = document.body.children[0];

            var newChild = document.createElement('DIV');
            newChild.style.width = document.body.getClientRects().width;
            newChild.innerHTML = '<p disabled="disabled" style="border-radius: 5px; background: #FF0000; opacity: 0.8; color: #FFFFFF; font-size: 75%; text-align: center; left: 10px; width: 200px; height: 18px; z-index: 2147483647; position: absolute; cursor:default; pointer-events: none; -webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;-o-user-select: none;user-select: none;">DEBUG MODE v1.0</p>';

            document.body.insertBefore(newChild, firstChild);
           
        }, 500);
        
        _isStarted = true;
        dispatchEvent('start', JSON.stringify(metrics));
    }
})();