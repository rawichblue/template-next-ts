import DetailModule from '@/modules/payments/detail';

interface Props {
  params: { id: string };
}

export default function PaymentDetailPage({ params }: Props) {
  return <DetailModule id={params.id} />;
}
