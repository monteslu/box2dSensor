define([

], function(){

  return function(ctx){
    ctx.fillRect(0, 0, this.width, this.height);

    //draw all of the box entities
    for(var id in this.entities){
      this.entities[id].draw(ctx, this.box.scale);
    }
  };

});