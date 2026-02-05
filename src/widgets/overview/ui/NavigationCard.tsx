import { Link } from "@cher1shrxd/loading";
import { ArrowRight } from "lucide-react";

interface Props {
  href: string;
  title: string;
  description: string;
}

const NavigationCard = ({ href, title, description }: Props) => {
  return (
    <Link
      href={href}
      className="group relative bg-surface border-2 border-border rounded-xl p-12 flex flex-col items-start gap-4 hover:border-primary transition-all duration-300 overflow-hidden">
      <div className="flex items-center justify-between w-full">
        <h3 className="text-4xl font-bold font-playpen">{title}</h3>
        <ArrowRight className="w-10 h-10 text-primary transition-transform duration-300 -rotate-45 group-hover:rotate-0" />
      </div>
      <p className="text-text/70 text-lg">{description}</p>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Link>
  );
};

export default NavigationCard;
