// components/RegionNote.tsx

interface Props {
  country: string;
  note: string;
}

export function RegionNote({ country, note }: Props) {
  return (
    <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm">
      <p className="font-medium text-blue-900">Note for {country}</p>
      <p className="mt-1 text-blue-900">{note}</p>
    </div>
  );
}
