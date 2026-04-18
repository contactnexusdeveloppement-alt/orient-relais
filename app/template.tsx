// CSS-only page transition wrapper: the previous version used Framer Motion
// to fade every page in from opacity:0 + y:10px, which pushed the global
// template into the 'use client' bundle (loads framer-motion eagerly on
// every route) and produced a 10 px layout shift on the LCP element. A
// CSS transition on opacity only keeps the effect while fixing CLS and
// removing framer-motion from the critical bundle.
export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <div className="animate-fade-in">
            {children}
        </div>
    );
}
