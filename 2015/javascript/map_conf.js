function MapConf(start_point, reverse_tiles, reverse_map, reverse_gravity, non_reverse_tiles){
	conf = {"start_point": start_point,
            "reverse_tiles": reverse_tiles,
            "reverse_map":reverse_map,
            "reverse_gravity": reverse_gravity,
            "non_reverse_tiles": non_reverse_tiles || []}
	return conf
}