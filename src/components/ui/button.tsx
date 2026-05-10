import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react';

function cn(...parts: Array<string | undefined | false>): string {
  return parts.filter(Boolean).join(' ');
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

const transition =
  'transition-[background-color,box-shadow,text-decoration-thickness,color,opacity] duration-[160ms] ease-[cubic-bezier(0.16,1,0.3,1)]';

const motionPrimaryInteractive = 'motion-safe:active:scale-[0.99]';

/** Ombre discrète — jeton `--shadow-button-primary` (@theme). */
const primaryShadow = 'shadow-[var(--shadow-button-primary)]';

/** Primaire : 44px min height, rayon 10px, libellé ~14px medium (voir tailles ci-dessous). */
const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] h-11 px-3.5 text-sm leading-snug',
  md: 'min-h-[44px] h-11 px-4 text-sm leading-snug',
  lg: 'min-h-[44px] h-11 px-5 text-sm leading-snug',
};

export interface ButtonClassesOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
}

export function buttonClasses(options: ButtonClassesOptions = {}): string {
  const { variant = 'primary', size = 'md', fullWidth, className } = options;

  const base = cn(
    'inline-flex items-center justify-center gap-2 font-ui font-medium select-none whitespace-nowrap',
    variant === 'link' ? 'rounded-[inherit]' : 'rounded-[10px]',
    variant === 'link' ? 'no-underline [text-decoration-skip-ink:none]' : 'no-underline',
  );

  const variants: Record<ButtonVariant, string> = {
    primary: cn(
      'bg-brand text-brand-ink-on',
      primaryShadow,
      'hover:bg-brand-hover',
      motionPrimaryInteractive,
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none disabled:motion-safe:hover:scale-100',
      transition,
    ),
    secondary: cn(
      'border border-border-strong bg-transparent text-ink-primary',
      'hover:bg-surface-muted',
      'motion-safe:active:scale-[0.99]',
      transition,
    ),
    ghost: cn(
      'border border-transparent bg-transparent text-ink-primary',
      'hover:bg-surface-muted',
      'motion-safe:active:scale-[0.99]',
      transition,
    ),
    link: cn(
      'min-h-0 h-auto p-0 font-medium text-brand underline decoration-1 underline-offset-4 shadow-none border-0 bg-transparent',
      'hover:text-brand-hover hover:decoration-2',
      'motion-safe:active:opacity-90',
      transition,
    ),
  };

  const sizeCls = variant === 'link' ? '' : sizeClasses[size];

  return cn(base, variants[variant], sizeCls, fullWidth && 'w-full', className);
}

/** Accordéons FAQ : hauteur fluide, fond hover, pas de coins arrondis sur toute la ligne. */
export function accordionDisclosureClasses(extraClassName?: string): string {
  return buttonClasses({
    variant: 'ghost',
    size: 'md',
    fullWidth: true,
    className: cn(
      '!min-h-0 !h-auto !whitespace-normal !items-start !justify-between !text-left !rounded-none border-0 font-normal hover:bg-surface-muted/60',
      extraClassName,
    ),
  });
}

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
  href?: string;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'>;

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
  href,
  type = 'button',
  ...rest
}: ButtonProps) {
  const cls = buttonClasses({ variant, size, fullWidth, className });

  if (href !== undefined) {
    return (
      <a href={href} className={cls} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} />
    );
  }

  return (
    <button type={type} className={cls} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)} />
  );
}
