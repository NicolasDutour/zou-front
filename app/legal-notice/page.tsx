import { remark } from 'remark';
import html from 'remark-html';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/legal-notices`, {
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

export default async function LegalNotice() {
  const legal_notice = await getData()

  const dateObject = new Date(legal_notice?.data[0].attributes?.updatedAt);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1; // Les mois sont indexés de 0 à 11, donc ajoutez 1.
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();

  const processedContent = await remark()
    .use(html)
    .process(legal_notice?.data[0].attributes?.content);
  const contentHtml = processedContent.toString();

  return (
    <div className='legal-notice p-6'>
      <p className='mb-6 text-4xl'>Les mentions légales</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml.replaceAll('\n', '<br />') }} />
      <p className='font-medium text-sm'>Dernière modification : Le {`${day}/${month}/${year} à ${hours}h${minutes}`}.</p>
    </div>
  )
}