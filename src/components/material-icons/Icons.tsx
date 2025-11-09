'use client';

import { Icon } from '@iconify/react';
import type { ReactElement, SVGProps, CSSProperties } from 'react';
import type { IconifyIcon } from '@iconify/types';

/* ============================================================================
   Tipos (sin any)
============================================================================ */
type Variant = 'outline' | 'rounded' | 'sharp' | 'filled';

type SafeSvgProps = Omit<
  SVGProps<SVGSVGElement>,
  'children' | 'width' | 'height' | 'mode' | 'onLoad' | 'rotate' | 'ref'
> & { mode?: never; onLoad?: never; rotate?: never; ref?: never };

export type IconProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties; // Permitir la propiedad style
  /**
   * 'outline' (default) | 'rounded' | 'sharp' | 'filled'
   */
  variant?: Variant;
  ariaLabel?: string;
  tooltip?: string;
  /** Rotación Iconify por cuartos (0,90,180,270) */
  turns?: 0 | 1 | 2 | 3;
  /** Rotación extra en grados vía CSS */
  rotateDeg?: number;
} & SafeSvgProps;

/* ============================================================================
   IMPORTS por icono (paquete correcto: @iconify-icons/material-symbols)
   Regla de nombres:
   - filled:   <name>
   - outline:  <name>-outline
   - rounded:  <name>-rounded
   - sharp:    <name>-sharp
   Si una variante NO existe, no la importes; hacemos fallback a filled.
============================================================================ */

/* básicos */
import lock_filled from '@iconify-icons/material-symbols/lock';
import lock_outline from '@iconify-icons/material-symbols/lock-outline';

import speed_filled from '@iconify-icons/material-symbols/speed';
import speed_outline from '@iconify-icons/material-symbols/speed-outline';

import search_filled from '@iconify-icons/material-symbols/search';

import monitoring_filled from '@iconify-icons/material-symbols/monitoring';

import sell_filled from '@iconify-icons/material-symbols/sell';
import sell_outline from '@iconify-icons/material-symbols/sell-outline';

import view_module_filled from '@iconify-icons/material-symbols/view-module';
import view_module_outline from '@iconify-icons/material-symbols/view-module-outline';

import list_filled from '@iconify-icons/material-symbols/list';
// (no todas las colecciones tienen list-outline; fallback a filled)
const list_outline = list_filled;

import lists_filled from '@iconify-icons/material-symbols/lists';
const lists_outline = lists_filled;

import grid_3x3_filled from '@iconify-icons/material-symbols/grid-3x3';

import info_filled from '@iconify-icons/material-symbols/info';
import info_outline from '@iconify-icons/material-symbols/info-outline';

import rocket_launch_filled from '@iconify-icons/material-symbols/rocket-launch';
import rocket_launch_outline from '@iconify-icons/material-symbols/rocket-launch-outline';

import chat_filled from '@iconify-icons/material-symbols/chat';
import chat_outline from '@iconify-icons/material-symbols/chat-outline';

import shopping_cart_filled from '@iconify-icons/material-symbols/shopping-cart';
import shopping_cart_outline from '@iconify-icons/material-symbols/shopping-cart-outline';

import domain_filled from '@iconify-icons/material-symbols/domain';

import article_filled from '@iconify-icons/material-symbols/article';
import article_outline from '@iconify-icons/material-symbols/article-outline';

import calendar_month_filled from '@iconify-icons/material-symbols/calendar-month';
import calendar_month_outline from '@iconify-icons/material-symbols/calendar-month-outline';

import event_available_filled from '@iconify-icons/material-symbols/event-available';
import event_available_outline from '@iconify-icons/material-symbols/event-available-outline';

import widgets_filled from '@iconify-icons/material-symbols/widgets';
import widgets_outline from '@iconify-icons/material-symbols/widgets-outline';

import add_circle_filled from '@iconify-icons/material-symbols/add-circle';
import add_circle_outline from '@iconify-icons/material-symbols/add-circle-outline';

import accessibility_filled from '@iconify-icons/material-symbols/accessibility';

import workspace_premium_filled from '@iconify-icons/material-symbols/workspace-premium';
// (outline no disponible en varias builds → fallback a filled)
const workspace_premium_outline = workspace_premium_filled;

import design_services_filled from '@iconify-icons/material-symbols/design-services';
import design_services_outline from '@iconify-icons/material-symbols/design-services-outline';

import travel_explore_filled from '@iconify-icons/material-symbols/travel-explore';

import code_filled from '@iconify-icons/material-symbols/code';

/* “check” en Material Symbols es DONE */
import done_filled from '@iconify-icons/material-symbols/done';

/* check-circle y radios */
import check_circle_filled from '@iconify-icons/material-symbols/check-circle';
import check_circle_outline from '@iconify-icons/material-symbols/check-circle-outline';

import radio_button_checked_filled from '@iconify-icons/material-symbols/radio-button-checked';
import radio_button_unchecked_filled from '@iconify-icons/material-symbols/radio-button-unchecked';

/* otros nombres con equivalencia */
import corporate_fare_filled from '@iconify-icons/material-symbols/corporate-fare';
const corporate_fare_outline = corporate_fare_filled; // fallback

/* estos suelen existir como filled; si no hay outline → fallback */
import format_list_bulleted_filled from '@iconify-icons/material-symbols/format-list-bulleted';
const format_list_bulleted_outline = format_list_bulleted_filled;

import trophy_filled from '@iconify-icons/material-symbols/trophy';
const trophy_outline = trophy_filled;

/* tus alias “problemáticos” mapeados a nombres reales */
import schedule_filled from '@iconify-icons/material-symbols/schedule'; // calendar-clock → schedule
const schedule_outline = schedule_filled;

import smartphone_filled from '@iconify-icons/material-symbols/smartphone'; // mobile → smartphone
const smartphone_outline = smartphone_filled;

/* ============================================================================
   Registro LOCAL: base -> variantes disponibles
   (si falta una variante, hacemos fallback a filled en runtime)
============================================================================ */
type VariantMap = Partial<Record<Variant, IconifyIcon>>;
type Registry = Record<string, VariantMap>;

const REGISTRY: Registry = {
  lock:                 { filled: lock_filled,                 outline: lock_outline },
  speed:                { filled: speed_filled,                outline: speed_outline },
  search:               { filled: search_filled },
  monitoring:           { filled: monitoring_filled },
  sell:                 { filled: sell_filled,                 outline: sell_outline },
  'view-module':        { filled: view_module_filled,          outline: view_module_outline },
  list:                 { filled: list_filled,                 outline: list_outline },
  lists:                { filled: lists_filled,                outline: lists_outline },
  'grid-3x3':           { filled: grid_3x3_filled },
  info:                 { filled: info_filled,                 outline: info_outline },
  'rocket-launch':      { filled: rocket_launch_filled,        outline: rocket_launch_outline },
  chat:                 { filled: chat_filled,                 outline: chat_outline },
  'shopping-cart':      { filled: shopping_cart_filled,        outline: shopping_cart_outline },
  domain:               { filled: domain_filled },
  article:              { filled: article_filled,              outline: article_outline },
  'calendar-month':     { filled: calendar_month_filled,       outline: calendar_month_outline },
  'event-available':    { filled: event_available_filled,      outline: event_available_outline },
  widgets:              { filled: widgets_filled,              outline: widgets_outline },
  'add-circle':         { filled: add_circle_filled,           outline: add_circle_outline },
  accessibility:        { filled: accessibility_filled },

  'workspace-premium':  { filled: workspace_premium_filled,    outline: workspace_premium_outline },
  'design-services':    { filled: design_services_filled,      outline: design_services_outline },
  'travel-explore':     { filled: travel_explore_filled },
  code:                 { filled: code_filled },

  /* equivalencias de nombres */
  done:                 { filled: done_filled },               // “check”
  'check-circle':       { filled: check_circle_filled,         outline: check_circle_outline },
  'radio-button-checked':   { filled: radio_button_checked_filled },
  'radio-button-unchecked': { filled: radio_button_unchecked_filled },
  'format-list-bulleted':   { filled: format_list_bulleted_filled, outline: format_list_bulleted_outline },

  /* alias personalizados que usabas */
  'calendar-clock':     { filled: schedule_filled,             outline: schedule_outline },           // alias → schedule
  mobile:               { filled: smartphone_filled,           outline: smartphone_outline },         // alias → smartphone

  /* sin variantes reales en el set → usa filled */
  'corporate-fare':     { filled: corporate_fare_filled,       outline: corporate_fare_outline },
  trophy:               { filled: trophy_filled,               outline: trophy_outline },
};

/* ============================================================================
   Factory y render (solo local; sin CDN)
============================================================================ */
type IconOptions = { defaultVariant?: Variant };

function createIcon(base: keyof typeof REGISTRY | string, display: string, opts?: IconOptions) {
  const { defaultVariant = 'outline' } = opts ?? {};

  const Cmp = ({
    size = 20,
    className = '',
    style,
    variant = defaultVariant,
    ariaLabel,
    tooltip,
    turns,
    rotateDeg,
    ...svgProps
  }: IconProps): ReactElement => {
    const {
      mode: _dropMode,
      onLoad: _dropOnLoad,
      rotate: _dropRotate,
      ref: _dropRef,
      style: incomingStyle,
      ...restSvg
    } = (svgProps as Record<string, unknown>) || {};

    const local =
      REGISTRY[base]?.[variant] ??
      (variant !== 'filled' ? REGISTRY[base]?.filled : undefined);

    if (!local && process.env.NODE_ENV !== 'production') {
      console.warn(`[Icons] Falta registrar "${String(base)}" (${variant}). Importa su variante o define fallback.`);
    }

    const mergedStyle: CSSProperties | undefined =
      rotateDeg != null
        ? {
            ...(incomingStyle as CSSProperties | undefined),
            transform: `${
              ((incomingStyle as CSSProperties | undefined)?.transform ?? '')
            } rotate(${rotateDeg}deg)`.trim(),
          }
        : (incomingStyle as CSSProperties | undefined);

    const node = (
      <Icon
        icon={(local ?? workspace_premium_filled) as IconifyIcon} // dummy fallback para typings; nunca debería ocurrir
        width={size}
        height={size}
        className={className}
        role={ariaLabel ? 'img' : undefined}
        aria-label={ariaLabel}
        aria-hidden={ariaLabel ? undefined : true}
        {...(turns != null ? { rotate: turns } : {})}
        {...(restSvg as SafeSvgProps)}
        style={mergedStyle}
      />
    );

    return tooltip ? <span title={tooltip} className="inline-flex">{node}</span> : node;
  };

  Cmp.displayName = display;
  return Cmp;
}

/* ============================================================================
   Exports (mantengo los nombres que ya usabas)
============================================================================ */
export const Lock               = createIcon('lock',                 'Lock');
export const Speed              = createIcon('speed',                'Speed');
export const Search             = createIcon('search',               'Search', { defaultVariant: 'filled' });
export const Monitoring         = createIcon('monitoring',           'Monitoring', { defaultVariant: 'filled' });
export const SellTag            = createIcon('sell',                 'SellTag');
export const ViewModule         = createIcon('view-module',          'ViewModule');
export const List               = createIcon('list',                 'List', { defaultVariant: 'filled' });
export const Grid3x3            = createIcon('grid-3x3',             'Grid3x3');
export const Info               = createIcon('info',                 'Info');
export const RocketLaunch       = createIcon('rocket-launch',        'RocketLaunch');
export const Chat               = createIcon('chat',                 'Chat');
export const ShoppingCart       = createIcon('shopping-cart',        'ShoppingCart');
export const Domain             = createIcon('domain',               'Domain');
export const Article            = createIcon('article',              'Article');
export const Lists              = createIcon('lists',                'Lists', { defaultVariant: 'filled' });
export const CalendarMonth      = createIcon('calendar-month',       'CalendarMonth');
export const EventAvailable     = createIcon('event-available',      'EventAvailable');
export const Check              = createIcon('done',                 'Check', { defaultVariant: 'filled' }); // “check” → done
export const CheckCircle        = createIcon('check-circle',         'CheckCircle');
export const RadioChecked       = createIcon('radio-button-checked', 'RadioChecked');
export const RadioUnchecked     = createIcon('radio-button-unchecked','RadioUnchecked');
export const FormatListBulleted = createIcon('format-list-bulleted', 'FormatListBulleted', { defaultVariant: 'filled' });
export const CalendarClock      = createIcon('calendar-clock',       'CalendarClock'); // alias → schedule
export const Automation         = createIcon('automation',           'Automation');
export const Mobile             = createIcon('mobile',               'Mobile');        // alias → smartphone
export const Trophy             = createIcon('trophy',               'Trophy');
export const Accessibility      = createIcon('accessibility',        'Accessibility', { defaultVariant: 'filled' });
export const WorkspacePremium   = createIcon('workspace-premium',    'WorkspacePremium');
export const DesignServices     = createIcon('design-services',      'DesignServices');
export const TravelExplore      = createIcon('travel-explore',       'TravelExplore');
export const Code               = createIcon('code',                 'Code');
export const CorporateFare      = createIcon('corporate-fare',       'CorporateFare', { defaultVariant: 'filled' });
export const Widgets            = createIcon('widgets',              'Widgets');
export const AddCircle          = createIcon('add-circle',           'AddCircle');
