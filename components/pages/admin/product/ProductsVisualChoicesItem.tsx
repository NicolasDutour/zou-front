export const ProductsVisualChoicesItem = ({
  item,
  choice,
  handleChangeRadioBox
}: {
  item:
  {
    key: string,
    value: string
  },
  choice: string,
  handleChangeRadioBox: (e: any) => void
}) => {
  return (
    <div className="flex items-center">
      <input
        className="h-9 w-6 cursor-pointer"
        onChange={handleChangeRadioBox}
        type="radio"
        value={item.key}
        checked={choice === item.key}
      />
      <label className="ml-2 text-muted-foreground"> {item.value} </label>
    </div>
  )
}
