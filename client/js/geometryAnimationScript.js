// Dots and lines
// http://codepen.io/EliFitch/pen/hasfq
// Dots and lines
// var header = $('.site-header'),
//     canvas = $('<canvas></canvas>').appendTo(header)[0],
      
//     ctx    = canvas.getContext('2d'),
//     //ctx    = canvas.getContext('2d').scale(2,2),
//     color  = '#35BF26',
//     idle   = null, mousePosition;
//     ctx.scale(2,2);

// canvas.width         = window.innerWidth * 2;
// canvas.height        = header.outerHeight() * 2;
// canvas.style.width = window.innerWidth+"px";
// canvas.style.height = header.outerHeight()+"px";
// canvas.style.display = 'block';

// ctx.fillStyle = color;
// //ctx.lineWidth = .5;
// ctx.lineWidth = 1.5;
// ctx.strokeStyle = color;

// var dotNum = Math.min((window.innerWidth/2),600);
// console.log(dotNum)
// var mousePosition = { x: 30 * canvas.width / 100, y: 30 * canvas.height / 100 },
//     //dots = { nb: 600, distance: 80, d_radius: 3000, array: [] };
// dots = { nb: dotNum, distance: 80, d_radius: 3000, array: [] };

// function Dot(){
//     this.x = Math.random() * canvas.width;
//     this.y = Math.random() * canvas.height;

//     this.vx = -.5 + Math.random();
//     this.vy = -.5 + Math.random();

//     this.radius = Math.random();
// }

// Dot.prototype = {
//     create: function(){
//         ctx.beginPath();
//         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//         ctx.fill();
//     },

//     animate: function(){
        
//         for(var i = 0, dot=false; i < dots.nb; i++){

//             dot = dots.array[i];

//             if(dot.y < 0 || dot.y > canvas.height){
//                 dot.vx = dot.vx;
//                 dot.vy = - dot.vy;
//             }else if(dot.x < 0 || dot.x > canvas.width){
//                 dot.vx = - dot.vx;
//                 dot.vy = dot.vy;
//             }
//             dot.x += dot.vx;
//             dot.y += dot.vy;
//         }
//     },

//     line: function(){
//         for(var i = 0; i < dots.nb; i++){
//             for(var j = 0; j < dots.nb; j++){
//                 i_dot = dots.array[i];
//                 j_dot = dots.array[j];

//                 if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
//                     if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
//                         ctx.beginPath();
//                         ctx.moveTo(i_dot.x, i_dot.y);
//                         ctx.lineTo(j_dot.x, j_dot.y);
//                         ctx.stroke();
//                         ctx.closePath();
//                     }
//                 }
//             }
//         }
//     }
// };

// function createDots(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for(var i = 0; i < dots.nb; i++){
//         dots.array.push(new Dot());
//         dot = dots.array[i];

//         dot.create();
//     }

//     dot.line();
//     dot.animate();
// }

// idle = setInterval(createDots, 1000/30);   

/*$(canvas).on('mousemove mouseleave', function(e){
    if(e.type == 'mousemove'){
        mousePosition.x = e.pageX;
        mousePosition.y = e.pageY;
    }
    if(e.type == 'mouseleave'){
        mousePosition.x = canvas.width / 2;
        mousePosition.y = canvas.height / 2;
    }
});*/


//dat.gui library



// $(document).ready(function(){
//   var mouseX, mouseY;
//   var ww = $( window ).width();
//   var wh = $( window ).height();
//   var traX, traY;
//   $(document).mousemove(function(e){
//     mouseX = e.pageX;
//     mouseY = e.pageY;
//     traX = ((4 * mouseX) / 570) + 40;
//     traY = ((4 * mouseY) / 570) + 50;
//     console.log(traX);
//     $(".title").css({"background-position": traX + "%" + traY + "%"});
//   });
// });





