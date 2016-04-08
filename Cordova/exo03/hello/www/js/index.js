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

        var pictureSource;
        pictureSource = Camera.PictureSourceType.SAVEDPHOTOALBUM;

        $('#CameraShot').click(function() {
            app.takePicture();
        });
        $('#CameraAlbum').click(function() {
            app.getPhoto(pictureSource);
        });

    },

    // Functions for camera use
    //------------------------
    
    takePicture: function() {
    // Take picture using device camera and retrieve image as base64-encoded string
        navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });

        function onSuccess(imageURI) {
            var image = document.getElementById('Image');
            image.src = imageURI;
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        };
    },
    getPhoto: function(source) {
        //document.getElementById('timestamp').innerHTML = new Date();
    // Retrieve image file location from specified source
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 50,
            targetWidth: 500,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: source
        });

        function onPhotoURISuccess(imageURI) {
        
            var galleryImage = document.getElementById('Image');
            galleryImage.style.display = 'block';
            galleryImage.src = imageURI;
        };

        function onFail(message) {
            alert('Failed because: ' + message);
        };
    },

    // END Functions for camera use
    //-----------------------------



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


app.initialize();