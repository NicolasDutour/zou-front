import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Separator } from "@/components/ui/separator"
import { BreadcrumbType } from '@/lib/definitions';

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: BreadcrumbType[]
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className='flex flex-wrap text-lg font-medium mb-6'>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={cn(
              breadcrumb.active ? 'text-white' : 'text-gray',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
      <Separator className='mb-6 w-full md:w-1/4 bg-gray' />
    </nav>
  );
}