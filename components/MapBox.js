"use client"

import { useState, useEffect } from 'react'
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Loader from '@/components/Loader';

const MapBox = ({ restaurant }) => {
  const [longitude, setLongitude] = useState(-74.005941)
  const [latitude, setLatitude] = useState(40.712784)
  const [isLoading, setIsloading] = useState(true)

  const getCoords = async () => {
    if (restaurant) {
      setLongitude(+restaurant?.longitude)
      setLatitude(+restaurant?.latitude)
      setIsloading(false)
    }
  }

  useEffect(() => {
    getCoords()
  }, [])

  return !isLoading ? (
    <Map
      mapLib={import('mapbox-gl')}
      initialViewState={{
        longitude: longitude,
        latitude: latitude,
        zoom: 14
      }}
      style={{ width: '100%', height: 600 }}
      mapStyle={`mapbox://styles/mapbox/streets-v9?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
    >
      <Marker longitude={longitude} latitude={latitude} color="red" anchor="bottom" />
    </Map>
  ) : <div className='flex justify-center bg-slate-600 text-white items-center h-full'>
    <Loader width={50} height={50} />
  </div>
};
export default MapBox
