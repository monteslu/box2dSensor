define([

], function(){

  return function(millis){

    for(var id in this.entities){
      if(this.entities[id].ball){
        if(this.box.bodiesMap[id].touching){
          this.entities[id].fillStyle = "rgba(255,0,0,0.5)";
        }else{
          this.entities[id].fillStyle = "rgba(128,128,128,0.5)";
        }
      }
    }

  };

});