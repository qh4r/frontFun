define(["domReady","jquery"],function(e){e(function(){function e(e){e.createSnake(),e.createFood(),e.setDirection("right"),e.score=0,e.gameLoop&&"undefined"!=typeof e.gameLoop&&clearInterval(e.gameLoop),e.gameLoop=setInterval(e.paint,e.getSpeed()),e.paint(),console.log("started")}var t=function(){function t(){var e=4;d=[];for(var t=e-1;t>-1;t--)d.push({x:t,y:0})}function n(){v={x:Math.round(Math.random()*(f-l)/l),y:Math.round(Math.random()*(u-l)/l)}}function a(){return h}function o(e,t,n){return n.forEach(function(n){return n.x===e&&n.y===t?!0:void 0}),!1}function r(){function t(e,t){c.fillStyle="#FFF",c.fillRect(e*l,t*l,l,l),c.strokeStyle="#F00",c.strokeRect(e*l,t*l,l,l)}function a(){}c.fillStyle="#000",c.fillRect(0,0,f,u),c.strokeStyle="#FFF",c.fillRect(0,0,f,u);var r=d[0].x,i=d[0].y;switch(s){case"right":r++;break;case"left":r--;break;case"up":i++;break;case"down":i--}if(-1===r||r===f/l||-1===i||i===u/l||o(r,i,d))return e(y);if(r===v.x&&i===v.y){var h={x:r,y:i};score++,n(),d.unshift(h)}else{var h=d.pop();h.x=r,h.y=i,d.unshift(h)}for(var p=0;p<d.length;p++){var g=d[p];t(g.x,g.y)}t(v.x,v.y),a(score)}function i(e){s=e}var c=($("#canvas")[0],this.canvas.getContext("2d")),f=this.canvas.width,s="right",u=this.canvas.height,l=15,h=150,d=[],v={},s="",y={getSpeed:a,createSnake:t,createFood:n,paint:r,setDirection:i};return y}();e(t)})});