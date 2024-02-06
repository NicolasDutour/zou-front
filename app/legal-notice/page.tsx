import { formatFullDay } from '@/lib/utils';
import { remark } from 'remark';
import html from 'remark-html';

async function getLegalNoticeData() {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;
  const url = `${STRAPI_URL}/api/legal-notice`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  if (!response.ok) {
    console.error('Failed to fetch data')
    return 'Error getting legal data'
  }
  return response.json()
}

export default async function LegalNotice() {
  const legalNoticeDetails = await getLegalNoticeData()

  if (!legalNoticeDetails?.data?.attributes) {
    return <div>No legal notice details available</div>;
  }

  const processedContent = await remark()
    .use(html)
    .process(legalNoticeDetails?.data?.attributes?.content);
  const contentHtml = processedContent.toString();

  return (
    <div className='p-6'>
      <p className='mb-6 text-4xl'>Les mentions légales</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml.replaceAll('\n', '<br />') }} />
      <p className='text-sm font-medium'>Dernière modification : Le {formatFullDay(legalNoticeDetails?.data?.attributes?.updatedAt, true)}.</p>
    </div>
  )
}
