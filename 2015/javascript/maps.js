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
       ['r','s','r','r','r','r','p','p','r','r'],
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

  var maps = [map1, map2, map3, map4]

  var map_conf = [
                  MapConf(new Point(1,1), new Point(8,1),false, true, false, ['s']),
                  MapConf(new Point(1,1), new Point(1,4),true, false, false),
                  MapConf(new Point(1,1), new Point(8,6),true, true, true),
                  MapConf(new Point(1,1), new Point(1,9),true, true, true)
                  ]