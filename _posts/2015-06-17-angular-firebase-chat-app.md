---
layout: post
title: Angular + Firebase = Chat App
tags:
    - angular
    - firebase
---

Angular is a JavaScript framework and Firebase is a real-time database service. Put them together (with a tiny bit of glue code) and you, too, can have a fully functioning chat application.

First, a quick and dirty `index.html` file:

```html
<!DOCTYPE html>
<html ng-app="app">
  <head>
    <script data-require="angular.js@1.4.0-rc.0" data-semver="1.4.0-rc.0" src="https://code.angularjs.org/1.4.0-rc.0/angular.js"></script>
    <script data-require="firebase@*" data-semver="2.2.2" src="//cdn.firebase.com/js/client/2.2.2/firebase.js"></script>
    <script data-require="angularfire@1.0.0" data-semver="1.0.0" src="//cdn.firebase.com/libs/angularfire/1.0.0/angularfire.min.js"></script>
    <link rel="stylesheet" href="style.css" />
    <script src="script.js"></script>
  </head>
  <body ng-controller="MainCtrl as view">
    Name: <input type="text" ng-model="view.name"/><br><br>
    Message:<br>
    <textarea type="text" ng-model="view.text"></textarea><br>
    <button ng-click="view.addMessage(view.name, view.text)">Send</button>
    <button ng-click="view.clearAll()">Clear all messages</button>
    <hr />
    <p ng-repeat="message in view.messages"><strong>{{message.from}}: </strong>{{message.body}}</p>
  </body>
</html>
```
In the `<head>` we're pulling in Angular, Firebase and the AngularFire library.

The `<body>` is controlled by `MainCtrl` which is bound to the JavaScript using Angular's "controller-as" syntax. There are a couple of buttons to add a message and to clear all the messages (though you probably wouldn't want that one in production 😆).

Lastly, a single `ng-repeat` lists out all the messages.

Hardly any Angular code is needed. Just wire things up:

```javascript
// Define the app
angular.module('app', ['firebase']);

// Main Controller
angular.module('app').controller('MainCtrl', MainCtrl);

MainCtrl.$inject = ['$scope', 'firebaseService'];

function MainCtrl($scope, firebaseService) {
  var view = this;
  view.name = "";
  view.from = "";
  view.messages = firebaseService.getMessages();
  view.addMessage = firebaseService.addMessage;
  view.clearAll = firebaseService.clearMessages;
}

// A simple service to wrap AngularFire
angular.module('app').factory('firebaseService', firebaseService);

firebaseService.$inject = ['$firebaseArray'];

function firebaseService($firebaseArray) {
  var messagesUrl = new Firebase("https://blistering-fire-2068.firebaseio.com/messages");
  var messages = $firebaseArray(messagesUrl);

  return {
    getMessages : getMessages,
    addMessage : addMessage,
    clearMessages : clearMessages
  };

  function getMessages() {
    return messages;
  }

  function addMessage(from, body) {
    from = from || "anon.";
    messages.$add({from: from, body: body});
  }

  function clearMessages() {
    messages.forEach(messages.$remove);
  }
}
```

The controller simply binds the `firebaseService` to the view. In a real app, your view probably has other things going on...

But that's it. Try it:

<iframe style="width: 100%; height: 600px" src="https://embed.plnkr.co/Gf7sRpRVJO4clHEi247x/" frameborder="0" allowfullscren="allowfullscren"></iframe>