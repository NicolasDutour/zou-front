import dynamic from 'next/dynamic'

async function getAllRestaurants() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/restaurants`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })

  if (!response.ok) {
    console.log("error");
  }

  return response.json();
}

const NoSSRYourComponent = async () => {
  const restaurantsData = await getAllRestaurants()

  const restaurants = restaurantsData?.data?.map(({ attributes: { slug, updatedAt } }) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/restaurant/${slug}`,
    lastModified: updatedAt,
    changeFrequency: 'yearly',
    priority: 1,
  }))

  const routes = [''].map((route) => ({
    url: `${process.env.NEXT_PUBLIC_FRONT_URL}/${route}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.8,
  }))

  return [...restaurants, ...routes]
}

// export it with SSR disabled
const YourComponent = dynamic(() => Promise.resolve(NoSSRYourComponent), {
  ssr: false,
})

export default YourComponent