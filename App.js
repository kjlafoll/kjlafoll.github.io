var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import React, { useState, useEffect } from 'react';
import ArrowExperiment from './ArrowExperiment';
import FaceExperiment from './FaceExperiment';

var App = function App() {
    var _useState = useState(null),
        _useState2 = _slicedToArray(_useState, 2),
        experimentType = _useState2[0],
        setExperimentType = _useState2[1];
    // Scrape the URL for the experiment type 


    useEffect(function () {
        //create object of URLSearchParams
        var urlParams = new URLSearchParams(window.location.search);
        //expType will be A1, A2, or F1
        var expType = urlParams.get('expType') || 'A1'; // Default to 'A' if not found
        setExperimentType(expType);
    }, []);

    // Render correct experiment based on the experiment type state
    var renderExperiment = function renderExperiment() {
        if (experimentType === 'F') {
            return React.createElement(FaceExperiment, { onExperimentComplete: function onExperimentComplete() {
                    return console.log('Face experiment completed');
                } });
        } else {
            return React.createElement(ArrowExperiment, { expType: experimentType, onExperimentComplete: function onExperimentComplete() {
                    return console.log('Arrow experiment completed');
                } });
        }
    };

    return React.createElement(
        'div',
        null,
        renderExperiment()
    );
};

export default App;