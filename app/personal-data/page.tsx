import { formatFullDay } from '@/lib/utils';
import { remark } from 'remark';
import html from 'remark-html';

async function getPersonalData() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/data-personal`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!res.ok) {
    console.error('Failed to fetch data')
    return 'Error getting legal data'
  }
  return res.json()
}

export default async function PersonalData() {
  const personalDetails = await getPersonalData()

  if (!personalDetails?.data?.attributes) {
    return <div>No legal notice details available</div>;
  }

  const processedContent = await remark()
    .use(html)
    .process(personalDetails?.data?.attributes?.content);
  const contentHtml = processedContent.toString();

  return (
    <div className='p-6'>
      <p className='mb-6 text-4xl'>Les données personnelles</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml.replaceAll('\n', '<br />') }} />
      <p className='text-sm font-medium'>Dernière modification : Le {formatFullDay(personalDetails?.data?.attributes?.updatedAt, true)}.</p>
    </div>
  )
}
