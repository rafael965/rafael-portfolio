import {
  ArrowLeft as PhArrowLeft,
  ArrowRight as PhArrowRight,
  ArrowUpRight as PhArrowUpRight,
} from "@phosphor-icons/react/ssr";

// Phosphor, one weight site-wide. The /ssr build works in server and client components.
type Props = { className?: string };

export const ArrowUpRight = ({ className = "size-[0.8em]" }: Props) => (
  <PhArrowUpRight weight="bold" aria-hidden="true" className={className} />
);

export const ArrowRight = ({ className = "size-[0.8em]" }: Props) => (
  <PhArrowRight weight="bold" aria-hidden="true" className={className} />
);

export const ArrowLeft = ({ className = "size-[0.8em]" }: Props) => (
  <PhArrowLeft weight="bold" aria-hidden="true" className={className} />
);
