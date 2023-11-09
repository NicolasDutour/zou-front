import { Metadata } from 'next';
import { remark } from 'remark';
import html from 'remark-html';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/data-personals`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache'
  })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export const metadata: Metadata = {
  title: 'Personal data'
}

export default async function PersonalData() {
  const personal = await getData()

  const dateObject = new Date(personal?.data[0].attributes?.updatedAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Les mois sont indexés de 0 à 11, donc ajoutez 1.
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const processedContent = await remark()
    .use(html)
    .process(personal?.data[0].attributes?.content);
  const contentHtml = processedContent.toString();

  return (
    <div className='legal-notice p-6'>
      <p className='mb-6 text-4xl'>Les données personnelles</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml.replaceAll('\n', '<br />') }} />
      <p className='font-medium text-sm'>Dernière modification : Le {`${day}/${month}/${year} à ${hours}h${minutes}`}.</p>
    </div>
  )
}
