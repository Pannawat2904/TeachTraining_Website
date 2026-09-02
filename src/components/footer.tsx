import { siteData } from "@/data/siteData";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full mt-0 py-4 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center justify-center relative z-10">
        <div className="w-12 h-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full mb-3"></div>
        <p className="text-xs font-medium text-foreground/60 tracking-wider">
          &copy; {currentYear} {siteData.student.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
