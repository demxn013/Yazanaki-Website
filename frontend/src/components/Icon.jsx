import {
  Lock,
  Layers,
  ShieldCheck,
  FileSignature,
  Maximize2,
  Coins,
  TrendingUp,
  Landmark,
  Network,
  Users,
  CircleDot,
} from "lucide-react";

// String-keyed icon registry. Data files reference icons by name, which
// keeps data layer framework-free and safe to move behind an API.
const icons = {
  Lock,
  Layers,
  ShieldCheck,
  FileSignature,
  Maximize2,
  Coins,
  TrendingUp,
  Landmark,
  Network,
  Users,
  CircleDot,
};

export function Icon({ name, size = 16, className = "" }) {
  const Component = icons[name] || Lock;
  return <Component size={size} className={className} />;
}

export default icons;
