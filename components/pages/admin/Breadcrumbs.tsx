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
      <Link href="/" className='flex items-center mb-4 text-primary'> <IoMdArrowBack /> <span className='ml-2 hover:underline underline-offset-2'>Retour vers Zou</span> </Link>
      <ol className='flex text-sm md:text-lg font-medium'>
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