import { Breadcrumb } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IoMdArrowBack } from "react-icons/io";

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="">
      <Link href="/" className='mb-4 flex items-center text-primary'> <IoMdArrowBack /> <span className='ml-2 underline-offset-2 hover:underline'>Retour vers Zou</span> </Link>
      <ol className='flex text-sm font-medium md:text-lg'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={cn(
              breadcrumb.active ? 'text-primary' : 'text-gray-600',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}