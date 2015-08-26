    var map2 = [ 
       ['r','r','r','r','r','r','r','r','r','r'],
       ['r','p','p','p','p','p','p','p','p','r'],
       ['r','w','w','w','f','f','w','w','g','r'],
       ['r','r','r','r','r','r','r','r','g','r'],
       ['r','g','p','p','p','p','p','p','p','r'],
       ['r','p','f','f','f','w','w','w','r','r'],
       ['r','r','r','r','r','r','r','r','r','r'] ]
  var map1 = [
       ['r','r','r','r','r','r','r','r','r','r'],
       ['r','p','r','p','p','r','p','p','p','r'],
       ['r','s','s','r','r','r','p','p','r','r'],
       ['r','p','p','p','p','p','p','r','p','r'],
       ['r','r','r','r','r','r','r','r','r','r']
  ]
  var map3 = [
       ['r','r','r','r','r','r','r','r','r','r'],
       ['r','p','g','g','g','g','g','g','g','r'],
       ['r','p','p','p','p','p','g','p','p','r'],
       ['r','g','w','g','g','g','g','g','g','r'],
       ['r','g','g','g','g','g','g','p','r','r'],
       ['r','w','w','w','w','w','w','p','r','r'],
       ['r','p','p','p','p','p','p','p','p','r'],
       ['r','r','w','w','w','w','f','f','f','r'] ]
  var map4 = [ 
       ['r','r','r','r','r','r','r','r','r','r'],
       ['r','p','p','p','g','p','p','p','p','r'],
       ['r','r','r','r','r','r','r','r','g','r'],
       ['r','p','p','r','r','p','p','p','g','r'],
       ['r','p','r','r','r','r','r','p','p','r'],
       ['r','p','r','r','r','r','r','r','r','r'],
       ['r','p','p','p','p','p','p','p','p','r'],
       ['r','w','f','f','f','w','w','r','p','r'],
       ['r','r','r','r','r','r','r','r','p','r'],
       ['r','p','p','p','p','r','r','p','p','r'],
       ['r','r','r','r','r','r','r','r','r','r'] ]
  var map5 = [
  ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r"], 
  ["r", "p", "p", "p", "g", "p", "p", "p", "p", "r"], 
  ["r", "p", "w", "f", "w", "f", "w", "p", "s", "r"], 
  ["r", "p", "r", "r", "r", "r", "r", "r", "p", "r"], 
  ["r", "g", "p", "p", "p", "p", "r", "r", "r", "r"], 
  ["r", "p", "r", "r", "r", "r", "r", "r", "r", "r"], 
  ["r", "g", "p", "p", "p", "p", "p", "p", "p", "r"], 
  ["r", "p", "p", "r", "r", "r", "r", "s", "s", "r"], 
  ["r", "f", "p", "p", "p", "p", "p", "p", "p", "r"], 
  ["r", "r", "r", "r", "r", "r", "r", "r", "r", "r"]]

  var map6 = [ 
   [ 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
   [ 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'r', 'r', 'r'],
   [ 'r', 'r', 'w', 'f', 'w', 'f', 'p', 'p', 'r', 'r'],
   [ 'r', 's', 's', 's', 's', 's', 'w', 'p', 'p', 'r'],
   [ 'r', 's', 'p', 'p', 'p', 'p', 'r', 'f', 'r', 'r'],
   [ 'r', 'p', 'p', 's', 'f', 'g', 'g', 'r', 'r', 'r'],
   [ 'r', 's', 'p', 'p', 'r', 'w', 'g', 'p', 'r', 'r'],
   [ 'r', 'p', 'p', 's', 'r', 'r', 'f', 'p', 'r', 'r'],
   [ 'r', 's', 'p', 'p', 'r', 'p', 'g', 'p', 'r', 'r'],
   [ 'r', 'p', 'p', 's', 'r', 'p', 'f', 'w', 'r', 'r'],
   [ 'r', 's', 'p', 'p', 'r', 'p', 'r', 'r', 'r', 'r'],
   [ 'r', 'p', 'p', 's', 's', 'p', 'r', 'r', 'r', 'r'],
   [ 'r', 's', 'p', 'p', 'p', 'f', 'r', 'r', 'r', 'r'],
   [ 'r', 'p', 'p', 's', 'r', 'r', 'r', 'r', 'r', 'r'],
   [ 'r', 's', 'p', 'p', 'p', 's', 's', 's', 's', 'r'],
   [ 'r', 'r', 'r', 'f', 'p', 'p', 'p', 'p', 'p', 'r'],
   [ 'r', 'p', 'p', 'p', 'r', 'r', 'r', 'r', 'p', 'r'],
   [ 'r', 'r', 'p', 'p', 'p', 'p', 'p', 'p', 'p', 'r'],
   [ 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'],
   [ 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']
 ]

  var maps = [map1, map2, map3, map4, map5, map6]

  var map_conf = [
                  
                 
                  MapConf(new Point(1,1), new Point(8,1),false, true, false, ['s']),
                  MapConf(new Point(1,1), new Point(1,4),true, false, false),
                  MapConf(new Point(1,1), new Point(8,6),true, true, true),
                  MapConf(new Point(1,1), new Point(1,9),true, true, true),
                  MapConf(new Point(8,8), new Point(8,1),true, true, true, ['s']), 
                  MapConf(new Point(8,17), new Point(1,1),true, true, true, ['s'])
                  ]
  var enemy = [
                [enemyConf(new Point(4, 3), 2)],
                [],[/*enemyConf(new Point(4, 2), 2)*/],
                [enemyConf(new Point(5, 1), 2)],
                [enemyConf(new Point(4, 6), 2)],
                [enemyConf(new Point(4, 15), 2)]
              ]
                  
