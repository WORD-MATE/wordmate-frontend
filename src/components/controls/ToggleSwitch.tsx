type ToggleSwitchProps = {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  labelHidden?: boolean
  className?: string
}

export default function ToggleSwitch({
  label,
  checked,
  onChange,
  labelHidden = false,
  className = '',
}: ToggleSwitchProps) {
  return (
    <label className={`flex shrink-0 items-center gap-2.5 ${className}`}>
      <span
        className={
          labelHidden
            ? 'sr-only'
            : 'text-content-secondary text-[13px] leading-[19.5px] font-semibold tracking-[-0.15px]'
        }
      >
        {label}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="peer sr-only"
      />
      <span
        className={`peer-focus-visible:ring-content relative h-[26px] w-11 shrink-0 rounded-[13px] transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 ${
          checked ? 'bg-brand' : 'bg-background-disabled'
        }`}
      >
        <span
          className={`bg-background absolute top-[3px] size-5 rounded-[10px] transition-[left] ${
            checked ? 'left-[21px]' : 'left-[3px]'
          }`}
        />
      </span>
    </label>
  )
}
