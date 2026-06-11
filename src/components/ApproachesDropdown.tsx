import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { buttonClasses } from './ui/button';

const LINKS = [
  { href: '/psychotherapie/', label: "Vue d'ensemble" },
  { href: '/therapie-mosaic/', label: 'Thérapie EMDR-MOSAIC' },
  { href: '/therapie-couple/', label: 'Thérapie de couple' },
  { href: '/psychologue-en-ligne/', label: 'Consultations en ligne' },
  { href: '/tcc-troisieme-vague/', label: 'TCC de 3e vague' },
  { href: '/meditation-pleine-conscience-sceaux/', label: 'Méditation (groupes)' },
] as const;

const easeMenu = [0.16, 1, 0.3, 1] as const;

function ApproachesDropdown() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelClose = useCallback(() => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  }, [cancelClose]);

  useEffect(() => () => cancelClose(), [cancelClose]);

  useEffect(() => {
    if (!open) return;

    const onDocMouseDown = (e: MouseEvent) => {
      const root = rootRef.current;
      if (root && !root.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onDocMouseDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const triggerClasses = buttonClasses({
    variant: 'ghost',
    size: 'md',
    className: '!font-normal normal-case rounded-md !px-3 gap-1 text-body-muted hover:text-brand',
  });

  const linkClasses =
    'font-ui mx-1 block rounded-lg px-3 py-2.5 text-sm text-body-muted outline-none transition-colors duration-150 hover:bg-surface-muted hover:text-brand focus-visible:z-10 focus-visible:relative';

  const variants = reduced
    ? {
        hidden: { opacity: 0, transition: { duration: 0.12, ease: easeMenu } },
        visible: { opacity: 1, transition: { duration: 0.18, ease: easeMenu } },
      }
    : {
        hidden: { opacity: 0, y: 4, transition: { duration: 0.12, ease: easeMenu } },
        visible: { opacity: 1, y: 0, transition: { duration: 0.18, ease: easeMenu } },
      };

  return (
    <div
      ref={rootRef}
      className="relative hidden md:block"
      onMouseEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onMouseLeave={() => scheduleClose()}
    >
      <button
        type="button"
        className={`${triggerClasses} ${open ? 'text-brand' : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
      >
        Approches
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Alignement du panneau sur le bord gauche du conteneur (= bord gauche du bouton déclencheur) */}
      {/* Léger chevauchement pour éviter un trou mort souris entre le bouton et le panneau */}
      <div className="absolute left-0 top-full z-50 -mt-1 w-52 pt-1">
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="approaches-panel"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="origin-top rounded-xl border border-border-subtle bg-surface-raised/92 py-1 shadow-[var(--shadow-menu-panel)] backdrop-blur-md"
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {LINKS.map(({ href, label }) => (
                <a key={href} href={href} className={linkClasses}>
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default ApproachesDropdown;
