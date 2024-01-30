// import dayjs from 'dayjs'
import { IoLocationOutline } from 'react-icons/io5'
import { AiOutlinePhone } from 'react-icons/ai'
import { MdAlternateEmail } from 'react-icons/md'

import { addSpaceToPhoneNumber, capitalize, cn } from '@/lib/utils'
import { RestaurantType } from '@/lib/types/restaurantType'


export default function RestaurantInfo({ restaurant }: { restaurant: RestaurantType }) {

  // const displayTime = (schedule: openingHour) => {
  //   if (schedule.open_or_closed === "open") {
  //     if (schedule.opening_time_morning && schedule.closing_time_morning && !schedule.opening_time_afternoon) {
  //       return <p>{formatTime(schedule.opening_time_morning)} - {formatTime(schedule.closing_time_morning)}</p>
  //     } else if (schedule.opening_time_morning && !schedule.closing_time_morning && !schedule.opening_time_afternoon && schedule.closing_time_afternoon) {
  //       return <p>{formatTime(schedule.opening_time_morning)} - {formatTime(schedule.closing_time_afternoon)} </p>
  //     } else if (schedule.opening_time_morning && schedule.closing_time_morning && schedule.opening_time_afternoon && schedule.closing_time_afternoon) {
  //       return <p>{formatTime(schedule.opening_time_morning)} - {formatTime(schedule.closing_time_morning)} , {formatTime(schedule.opening_time_afternoon)} - {formatTime(schedule.closing_time_afternoon)} </p>
  //     }
  //   }
  //   return (
  //     <p> Fermé </p>
  //   )
  // }

  // const displayOpeningHour = () => {
  //   return restaurant?.opening_hour?.map(schedule => {
  //     return (
  //       <div key={schedule.id} className={cn(
  //         "flex items-center text-lg",
  //         schedule.day === dayjs(new Date()).format('dddd').toLowerCase() ? "bg-slate-400 text-white p-1 rounded-md" : "text-gray-400"
  //       )}>
  //         <p className="mr-6"> {capitalize(schedule.day) || null}: </p>
  //         {displayTime(schedule)}
  //       </div>
  //     )
  //   })
  // }

  return (
    <div className="flex flex-col justify-around items-center p-6">
      <div>
        <p className="text-center text-2xl mb-4 uppercase text-white"> {restaurant?.restaurant_name}</p>
        <div className='flex items-center mb-4'>
          <IoLocationOutline className="text-white text-2xl" />
          <div className='flex flex-col ml-6'>
            <p className="text-lg text-gray-400">{restaurant?.address && restaurant?.address + ','}</p>
          </div>
        </div>
        <div className='flex items-center mb-4'>
          <AiOutlinePhone className="text-white text-2xl" />
          <p className="text-lg text-gray-400 ml-6">{addSpaceToPhoneNumber(restaurant?.phone) || null}</p>
        </div>
        <div className='flex items-center mb-4'>
          <MdAlternateEmail className="text-white text-2xl" />
          <p className="text-lg text-gray-400 ml-6">{restaurant?.email || null}</p>
        </div>
      </div>
      {/* <div>
        {displayOpeningHour()}
      </div> */}
    </div>
  )
}
