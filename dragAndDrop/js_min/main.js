define(["domReady","./addButton","./note"],function(n,e,t){n(function(){var n=function(n){function e(n){console.log("db -> ",n)}if(n.openDatabase){var t=n.openDatabase("noteTest2","1.0","notes test db one",10485760,e);if(!t)throw new Error("db not accessible");return t}throw new Error("db not supported")}(window);document.addEventListener("contextmenu",function(t){t.preventDefault();new e(document.body,n,t.x,t.y)})})});