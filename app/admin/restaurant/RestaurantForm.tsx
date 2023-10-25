"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { TypeFormSchemaRestaurant, FormSchemaRestaurant, RestaurantType } from '@/lib/types';
import Loader from "@/components/Loader"
import { auth, db } from "@/firebase"
import { collection, serverTimestamp, onSnapshot, query, where, addDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"

export function RestaurantForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [restaurants, setRestaurants] = useState<RestaurantType[]>([])
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [openAddressDialog, setOpenAddressDialog] = useState(false);
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    setValue
  } = useForm<TypeFormSchemaRestaurant>({
    resolver: zodResolver(FormSchemaRestaurant),
  });

  useEffect(() => {
    const getRestaurantDetails = async (userId: string) => {
      const restaurantCollectionRef = collection(db, "restaurants")

      try {
        const queryRestaurant = query(restaurantCollectionRef, where("userId", "==", userId))
        onSnapshot(queryRestaurant, (snapshot) => {
          let restaurants: RestaurantType[] = []
          snapshot.forEach((doc) => {
            const data = doc.data()
            const id = doc.id
            restaurants.push({ ...data, id })
          })
          setRestaurants(restaurants)
          setFocus("restaurant_name");

          if (restaurants.length > 0) {
            setValue('restaurant_name', restaurants[0]?.restaurant_name)
            setValue('address', restaurants[0]?.address)
            setValue('description', restaurants[0]?.description)
            setValue('email', restaurants[0]?.email)
            setValue('phone', restaurants[0]?.phone)
          }
        })
      } catch (error) {
        console.log("error to get data: ", error);
      }

      // const restaurantsCollectionRef = collection(db, "restaurants")
      // const data = await getDocs(restaurantsCollectionRef)
      // const filterData = data.docs.map(doc => ({
      //   ...doc.data(), id: doc.id
      // }))
      // return filterData
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        getRestaurantDetails(user.uid)
      }
    })
  }, [setFocus])

  const onSubmit = async (data: z.infer<typeof FormSchemaRestaurant>) => {
    const restaurantsCollectionRef = collection(db, "restaurants")
    const { restaurant_name, address, description, email, phone } = data

    try {
      setIsLoading(true)
      await addDoc(restaurantsCollectionRef, {
        restaurant_name,
        address,
        description,
        email,
        phone,
        longitude,
        latitude,
        userId: auth?.currentUser?.uid,
        createdAt: serverTimestamp()
      })

      setIsLoading(false)
      toast({
        title: "Données mises à jour"
      })
    } catch (error) {
      console.log("error creating restaurant", error);
      setIsLoading(false)
    }
  }

  const fetchAddressSuggestions = async (query: string) => {
    const res = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-cache'
    })

    const address = await res.json()
    return address
  };

  const handleAddressChange = async (value: string) => {
    setOpenAddressDialog(true)
    if (value.trim() !== '') {
      const suggestions = await fetchAddressSuggestions(value);
      setAddressSuggestions(suggestions.features);

    } else {
      setAddressSuggestions([])
    }
  };

  const selectAddress = (coordinates: string[]) => {
    setAddressSuggestions([])
    setOpenAddressDialog(false)
    setLongitude(coordinates[0].toString())
    setLatitude(coordinates[1].toString())
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-6 mt-10">
        <div>
          <label htmlFor="restaurant_name" className="block text-sm font-medium leading-6 text-gray-900">
            Nom du restaurant
          </label>
          <div className="mt-2">
            <input
              {...register("restaurant_name")}
              id="restaurant_name"
              type="text"
              className="block p-2 w-1/2 rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.restaurant_name?.message}</p>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
            Adresse
          </label>
          <div className="mt-2">
            <input
              {...register("address")}
              id="address"
              type="text"
              onChange={(e) => handleAddressChange(e.target.value)}
              className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.address?.message}</p>
          </div>
          {
            openAddressDialog && (
              <div className="absolute overflow-scroll overflow-x-hidden z-40 bottom-30 left-0 h-44 w-full rounded-lg bg-white text-black border border-primary">
                {
                  addressSuggestions.length > 0 && (
                    <ul className="z-50">
                      {
                        addressSuggestions.map((suggestion, index) => {
                          return (
                            <li key={index} className="cursor-pointer p-2 hover:bg-slate-400 hover:text-white" onClick={() => {
                              setValue('address', suggestion.properties.label)
                              selectAddress(suggestion.geometry.coordinates)
                            }}>
                              {suggestion.properties.label}
                            </li>
                          )
                        })
                      }
                    </ul>
                  )
                }
              </div>
            )
          }
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            Description
          </label>
          <div className="mt-2">
            <textarea
              {...register("description")}
              id="description"
              rows="5"
              className="resize-none block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            ></textarea>
            <p className="text-red-500 text-sm mt-2">{errors.description?.message}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2">
              <input
                {...register("email")}
                id="email"
                type="email"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.email?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </label>
            <div className="mt-2">
              <input
                {...register("phone")}
                id="phone"
                type="text"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.phone?.message}</p>
            </div>
          </div>
        </div>

        {/* <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="opening_time_morning" className="block text-sm font-medium leading-6 text-gray-900">
              Heure d'ouverture du matin
            </label>
            <div className="mt-2">
              <input
                {...register("opening_time_morning")}
                id="opening_time_morning"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.opening_time_morning?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="closing_time_morning" className="block text-sm font-medium leading-6 text-gray-900">
              Heure de fermeture du matin
            </label>
            <div className="mt-2">
              <input
                {...register("closing_time_morning")}
                id="closing_time_morning"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.closing_time_morning?.message}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="opening_time_afternoon" className="block text-sm font-medium leading-6 text-gray-900">
              Heure d'ouverture de l'après midi
            </label>
            <div className="mt-2">
              <input
                {...register("opening_time_afternoon")}
                id="opening_time_afternoon"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.opening_time_afternoon?.message}</p>
            </div>
          </div>

          <div>
            <label htmlFor="closing_time_afternoon" className="block text-sm font-medium leading-6 text-gray-900">
              Heure de fermeture de l'après midi
            </label>
            <div className="mt-2">
              <input
                {...register("closing_time_afternoon")}
                id="closing_time_afternoon"
                type="time"
                className="block p-2 w-full rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
              />
              <p className="text-red-500 text-sm mt-2">{errors.closing_time_afternoon?.message}</p>
            </div>
          </div>
        </div> */}

        {/* <div>
          <label htmlFor="photo_banner" className="block text-sm font-medium leading-6 text-gray-900">
            Photo de présentation du restaurant
          </label>
          <div className="mt-2">
            <input
              {...register("photo_banner")}
              id="photo_banner"
              type="file"
              className="block p-2 w-1/2 rounded-md border-0 bg-white/5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-900 focus:ring-2 focus:ring-inset focus:ring-green-800 sm:text-sm sm:leading-6"
            />
            <p className="text-red-500 text-sm mt-2">{errors.photo_banner?.message}</p>
          </div>
        </div> */}

        <div>
          <button
            type='submit'
            disabled={isLoading}
            className="disabled:opacity-40 flex w-1/2 justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          >
            {
              isLoading ? <Loader width={30} height={30} /> : 'Mettre à jour'
            }
          </button>
        </div>
      </div>
    </form>
  )
}