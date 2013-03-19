define([
  './update',
  './draw',
  './boxData',
  'dojo/keys',
  'frozen/box2d/BoxGame',
  'frozen/box2d/Box',
  'frozen/box2d/entities'
], function(update, draw, boxData, keys, BoxGame, Box, allEntities){

  var i, j;

  var box = new Box({
    resolveCollisions: true,
    gravityY: 0,
    addContactListener: function(callbacks) {
      var listener = new Box2D.Dynamics.b2ContactListener();
      listener.BeginContact = function(contact) {
        if(contact.IsTouching()){
          contact.GetFixtureA().GetBody().touching = true;
        }
      };
      listener.EndContact = function(contact) {
        if(!contact.IsTouching()){
          contact.GetFixtureA().GetBody().touching = false;
        }
      };
      this.b2World.SetContactListener(listener);
    }
   });

  //setup a GameCore instance
  var game = new BoxGame({
    canvasId: 'canvas',
    gameAreaId: 'gameArea',
    canvasPercentage: 0.95,
    update: update,
    draw: draw,
    box: box,
    initInput: function(im){
      //setup key mappings
      im.addKeyAction(keys.SPACE, true);
    },
    handleInput: function(im, millis){
      //do something with key event
      if(im.keyActions[keys.SPACE].getAmount() || im.touchAction.isPressed()){
        for(var id in this.entities){
          if(this.entities[id].ball){
            game.box.applyImpulseDegrees(id, Math.random() * 360, 40);
          }
        }
      }
    }
  });



  //add everything to box from the boxData
  for (i = 0; i < boxData.entities.length; i++) {
    var obj = boxData.entities[i];
    var ent;
    if(allEntities[obj.type]){
      ent = new allEntities[obj.type](obj);
    }

    if(ent){
      game.addBody(ent);
    }
  }


  //add some dynamic circles
  for (i = 0; i < 3; i++) {
    for (j = 0; j < 2; j++) {
      var circ = new allEntities.Circle({
        restitution : 1,
        x: 100 + i * 70,
        y: 100 + j * 70,
        radius: 30,
        staticBody: false,
        id: 'circ_' + i + '_' + j,
        ball: true,
        groupIndex: -1
      });
      game.addBody(circ);

    }
  }

  //add a circle shaped sensor
  var sensorCirc = new allEntities.Circle({
    restitution : 1,
    x: 300,
    y: 300,
    radius: 50,
    staticBody: true,
    id: 'sensorCirc',
    strokeStyle : '#0F0'
  });
  game.addBody(sensorCirc);
  var fixtureList = game.box.bodiesMap[sensorCirc.id].m_fixtureList;
  fixtureList.SetSensor(true);


  //launch the game!
  game.run();

});