import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { capitalize, cn } from '@/lib/utils';
import { RestaurantType } from "@/lib/validations";

export const OptionItem = ({ option, restaurant }: { option: { key: string, value: string }, restaurant: RestaurantType }) => {
  return (
    <div className={cn('border rounded-md p-2 flex items-center', (restaurant as any)[option.key] ? 'border-green-600' : 'border-red-600')}>
      <div className={cn("mr-6 text-2xl", (restaurant as any)[option.key] ? "text-green-600" : "text-red-600")}>
        {(restaurant as any)[option.key] ? <FaCheck /> : <RxCross2 />}
      </div>
      <p className="text-center text-lg text-white">{capitalize(option.value)}</p>
    </div>
  )
}
