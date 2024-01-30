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
  }
  return response.json()
}

export default async function LegalNotice() {
  const legalNoticeDetails = await getLegalNoticeData()
  const { updatedAt, content } = legalNoticeDetails?.data?.attributes

  if (!legalNoticeDetails.data) {
    return <div>No legal notice for today</div>
  }

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

  return (
    <div className='p-6'>
      <p className='mb-6 text-4xl'>Les mentions légales</p>
      <div dangerouslySetInnerHTML={{ __html: contentHtml.replaceAll('\n', '<br />') }} />
      <p className='text-sm font-medium'>Dernière modification : Le {formatFullDay(updatedAt)}.</p>
    </div>
  )
}
