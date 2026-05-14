// components/ExemptionBanner.tsx
// Surfaces CEC / job-offer exemption prominently when applicable.
// If the applicant is exempt, this is the most important thing on the page -
// they do not need POF and should not spend energy worrying about the amount.

interface Props {
  status: 'exempt' | 'not_exempt' | 'unclear';
  explanation: string;
}

export function ExemptionBanner({ status, explanation }: Props) {
  if (status === 'not_exempt') return null;

  const isExempt = status === 'exempt';
  const styles = isExempt
    ? 'border-green-200 bg-green-50 text-green-900'
    : 'border-amber-200 bg-amber-50 text-amber-900';

  return (
    <div className={'rounded-md border p-4 ' + styles}>
      <p className="text-sm font-semibold">
        {isExempt ? 'Good news: you may be exempt from proof of funds' : 'Exemption status unclear'}
      </p>
      {explanation && <p className="mt-2 text-sm">{explanation}</p>}
    </div>
  );
}
