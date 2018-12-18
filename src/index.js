import React from 'react';
import ReactDOM from 'react-dom';
import ApplicationClient from './ApplicationClient';
import registerServiceWorker from './registerServiceWorker';

import './index.css';

ReactDOM.render(<ApplicationClient />, document.getElementById('root'));
registerServiceWorker();
