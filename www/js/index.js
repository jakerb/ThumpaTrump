/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');

        var orgWidth;
        var orgHeight;
        if(window.localStorage.getItem('orgWidth')==null){
          orgWidth=screen.width;
          orgHeight=screen.height;
          window.localStorage.setItem('orgWidth',orgWidth)
          window.localStorage.setItem('orgHeight',orgHeight)
        }else {
          orgWidth=parseInt(window.localStorage.getItem('orgWidth'));
          orgHeight=parseInt(window.localStorage.getItem('orgHeight'));
          if(orgWidth<screen.width){
              orgWidth=screen.width;
              orgHeight=screen.height;
              window.localStorage.setItem('orgWidth',orgWidth)
              window.localStorage.setItem('orgHeight',orgHeight)
          }
        }

      var nScale=orgWidth/320;
      if(orgHeight/480<nScale)nScale=orgHeight/480;
      var transx=((orgWidth-320)/2)/nScale;
      var transy=((orgHeight-480)/2)/nScale;
      if(orgHeight/nScale-480>0){
          transy=transy-(orgHeight/nScale-480)/2
      }
      if(nScale!=1){
        document.getElementById('body').style.webkitTransform="scale("+nScale
    +","+nScale+") translate("+transx+"px, "+transy+"px)";
        document.getElementById('body').style.width="320px";
        document.getElementById('body').style.height="480px";
      }

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

    WebView webview = new WebView(this);
    webview.getSettings().setCacheMode(2);

    WebSettings settings = this.appView.getSettings();
    settings.setSupportZoom(true);
    settings.setBuiltInZoomControls(true);
