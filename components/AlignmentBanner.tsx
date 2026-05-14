// components/AlignmentBanner.tsx

interface Props {
  message: string;
}

export function AlignmentBanner({ message }: Props) {
  const aligned = message.toLowerCase().includes('align');
  const colorClasses = aligned
    ? 'border-green-200 bg-green-50 text-green-900'
    : 'border-amber-200 bg-amber-50 text-amber-900';

  return (
    <div className={'rounded-md border p-4 text-sm ' + colorClasses}>
      <p className="font-medium">Alignment check</p>
      <p className="mt-1">{message}</p>
    </div>
  );
}
