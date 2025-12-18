import React from 'react';

interface SVGProps {
  className?: string;
  [key: string]: any;
}

// Relationship Graph SVG
export const RelationshipGraph: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 400 400"
    className={className}
    aria-label="Relationship graph showing star connected to galaxy"
    {...props}
  >
    <g>
      <path
        d="M 50 30 L 52 40 L 62 40 L 54 46 L 56 56 L 50 50 L 44 56 L 46 46 L 38 40 L 48 40 Z"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
        opacity="0.9"
      />
      <circle
        cx="50"
        cy="40"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
    </g>
    <g>
      <circle
        cx="350"
        cy="350"
        r="40"
        fill="none"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        strokeOpacity="0.6"
        className="dark:stroke-blue-400"
      />
      <circle
        cx="350"
        cy="350"
        r="28"
        fill="none"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        strokeOpacity="0.8"
        className="dark:stroke-blue-400"
      />
      <circle
        cx="350"
        cy="310"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="390"
        cy="350"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="350"
        cy="390"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="310"
        cy="350"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="370"
        cy="330"
        r="2.5"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
    </g>
    <line
      x1="50"
      y1="50"
      x2="350"
      y2="350"
      stroke="rgb(168, 85, 247)"
      strokeWidth="2.5"
      strokeOpacity="0.6"
      strokeDasharray="4,3 6,3 8,4 10,4 12,5 14,5 16,6 18,6"
      className="dark:stroke-purple-400"
    />
  </svg>
);

// Lightning Bolt Icon
export const LightningIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="skyblue"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

// Left Arrow Icon
export const LeftArrowIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
);

// Right Arrow Icon
export const RightArrowIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    />
  </svg>
);

// Finger Touch Icon
export const FingerTouchIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" {...props}>
    <ellipse
      cx="12"
      cy="18"
      rx="3"
      ry="4"
      fill="currentColor"
      opacity="0.8"
    />
    <ellipse
      cx="12"
      cy="14"
      rx="2.5"
      ry="3.5"
      fill="currentColor"
      opacity="0.9"
    />
    <ellipse cx="12" cy="10" rx="2" ry="3" fill="currentColor" />
    <circle cx="12" cy="7" r="1.5" fill="currentColor" opacity="0.6" />
    <path
      d="M8 7 L10 7 M14 7 L16 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Lightbulb Icon
export const LightbulbIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="skyblue"
    viewBox="0 0 24 24"
    width="3em"
    height="3em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

// Checkmark Circle Icon
export const CheckmarkCircleIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="green"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Checkmark Icon
export const CheckmarkIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="green"
    viewBox="0 0 20 20"
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

// Users Icon
export const UsersIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="white"
    stroke="none"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

// Users Group Icon
export const UsersGroupIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="white"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

// Warning Triangle Icon
export const WarningTriangleIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="red"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    />
  </svg>
);

// Declining Graph SVG
export const DecliningGraph: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 300 120"
    className={className}
    aria-label="Declining donation sustainability graph"
    {...props}
  >
    <line
      x1="20"
      y1="20"
      x2="20"
      y2="100"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.2"
      className="text-slate-400"
    />
    <line
      x1="20"
      y1="100"
      x2="280"
      y2="100"
      stroke="currentColor"
      strokeWidth="1"
      strokeOpacity="0.2"
      className="text-slate-400"
    />
    <polyline
      points="30,30 80,45 130,60 180,75 230,90"
      fill="none"
      stroke="rgb(239, 68, 68)"
      strokeWidth="3"
      strokeLinecap="round"
      className="dark:stroke-red-400"
    />
    <circle
      cx="30"
      cy="30"
      r="4"
      fill="rgb(239, 68, 68)"
      className="dark:fill-red-400"
    />
    <circle
      cx="80"
      cy="45"
      r="4"
      fill="rgb(239, 68, 68)"
      className="dark:fill-red-400"
    />
    <circle
      cx="130"
      cy="60"
      r="4"
      fill="rgb(239, 68, 68)"
      className="dark:fill-red-400"
    />
    <circle
      cx="180"
      cy="75"
      r="4"
      fill="rgb(239, 68, 68)"
      className="dark:fill-red-400"
    />
    <circle
      cx="230"
      cy="90"
      r="4"
      fill="rgb(239, 68, 68)"
      className="dark:fill-red-400"
    />
    <text
      x="150"
      y="115"
      textAnchor="middle"
      className="text-xs fill-slate-500 dark:fill-slate-400"
      fontSize="12"
    >
      Time
    </text>
  </svg>
);

// Book Icon
export const BookIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

// Clock Icon
export const ClockIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

// Lock Icon
export const LockIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="red"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

// Chart/Growth Icon
export const ChartIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="none"
    stroke="skyblue"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    />
  </svg>
);

// X Circle Icon
export const XCircleIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
      clipRule="evenodd"
    />
  </svg>
);

// Bar Chart Icon
export const BarChartIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20" {...props}>
    <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
  </svg>
);

// Funding Flow Diagram SVG
export const FundingFlowDiagram: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 400 180"
    className={className}
    aria-label="Funding to Star Tokens to Users, Maintainers, Contributors"
    {...props}
  >
    <g>
      <circle
        cx="60"
        cy="90"
        r="30"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.3"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        className="dark:fill-blue-400/30 dark:stroke-blue-400"
      />
      <text
        x="60"
        y="98"
        textAnchor="middle"
        className="text-sm fill-slate-800 dark:fill-slate-200"
        fontSize="14"
        fontWeight="bold"
      >
        💰
      </text>
      <text
        x="60"
        y="140"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="11"
      >
        Funding
      </text>
    </g>
    <path
      d="M 90 90 L 140 90"
      stroke="rgb(168, 85, 247)"
      strokeWidth="2.5"
      fill="none"
      markerEnd="url(#arrow-purple)"
      className="dark:stroke-purple-400"
    />
    <g>
      <circle
        cx="200"
        cy="90"
        r="30"
        fill="rgb(234, 179, 8)"
        fillOpacity="0.3"
        stroke="rgb(234, 179, 8)"
        strokeWidth="2"
        className="dark:fill-yellow-400/30 dark:stroke-yellow-400"
      />
      <path
        d="M200 70 L202 80 L212 80 L204 88 L206 98 L200 92 L194 98 L196 88 L188 80 L198 80 Z"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <text
        x="200"
        y="140"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="11"
      >
        Star Tokens
      </text>
    </g>
    <path
      d="M 230 90 L 280 90"
      stroke="rgb(168, 85, 247)"
      strokeWidth="2.5"
      fill="none"
      markerEnd="url(#arrow-purple)"
      className="dark:stroke-purple-400"
    />
    <g>
      <circle
        cx="320"
        cy="60"
        r="18"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.2"
        stroke="rgb(59, 130, 246)"
        strokeWidth="1.5"
        className="dark:fill-blue-400/20 dark:stroke-blue-400"
      />
      <text
        x="320"
        y="66"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="10"
      >
        👤
      </text>
      <text
        x="320"
        y="90"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="9"
      >
        User
      </text>
      <circle
        cx="320"
        cy="90"
        r="18"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="1.5"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <text
        x="320"
        y="96"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="10"
      >
        🔧
      </text>
      <text
        x="320"
        y="120"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="9"
      >
        Maintainer
      </text>
      <circle
        cx="320"
        cy="120"
        r="18"
        fill="rgb(34, 197, 94)"
        fillOpacity="0.2"
        stroke="rgb(34, 197, 94)"
        strokeWidth="1.5"
        className="dark:fill-green-400/20 dark:stroke-green-400"
      />
      <text
        x="320"
        y="126"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="10"
      >
        ⭐
      </text>
      <text
        x="320"
        y="150"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="9"
      >
        Contributor
      </text>
    </g>
    <defs>
      <marker
        id="arrow-purple"
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="rgb(168, 85, 247)"
          className="dark:fill-purple-400"
        />
      </marker>
    </defs>
  </svg>
);

// Three-Layer Blockchain Visualization
export const BlockchainVisualization: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 300 400"
    className={className}
    aria-label="Three-layer blockchain visualization"
    {...props}
  >
    <g opacity="0.4" transform="translate(0, 300)">
      <circle
        cx="50"
        cy="20"
        r="8"
        fill="rgb(34, 211, 238)"
        className="dark:fill-cyan-400"
      />
      <circle
        cx="150"
        cy="30"
        r="8"
        fill="rgb(34, 211, 238)"
        className="dark:fill-cyan-400"
      />
      <circle
        cx="250"
        cy="25"
        r="8"
        fill="rgb(34, 211, 238)"
        className="dark:fill-cyan-400"
      />
      <circle
        cx="100"
        cy="50"
        r="8"
        fill="rgb(34, 211, 238)"
        className="dark:fill-cyan-400"
      />
      <circle
        cx="200"
        cy="45"
        r="8"
        fill="rgb(34, 211, 238)"
        className="dark:fill-cyan-400"
      />
      <line
        x1="50"
        y1="20"
        x2="150"
        y2="30"
        stroke="rgb(34, 211, 238)"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="150"
        y1="30"
        x2="250"
        y2="25"
        stroke="rgb(34, 211, 238)"
        strokeWidth="1"
        opacity="0.5"
      />
      <line
        x1="100"
        y1="50"
        x2="200"
        y2="45"
        stroke="rgb(34, 211, 238)"
        strokeWidth="1"
        opacity="0.5"
      />
      <text
        x="150"
        y="80"
        textAnchor="middle"
        className="text-xs fill-cyan-400 dark:fill-cyan-300"
        fontSize="10"
      >
        Blockchain Network
      </text>
    </g>
    <g transform="translate(50, 150)">
      <rect
        x="0"
        y="0"
        width="200"
        height="120"
        rx="8"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="2"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <circle
        cx="100"
        cy="40"
        r="25"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <path
        d="M100 20 L102 30 L112 30 L104 38 L106 48 L100 42 L94 48 L96 38 L88 30 L98 30 Z"
        fill="white"
      />
      <text
        x="100"
        y="75"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="10"
        fontWeight="bold"
      >
        Star Token
      </text>
      <rect
        x="20"
        y="85"
        width="70"
        height="20"
        rx="4"
        fill="rgb(239, 68, 68)"
        fillOpacity="0.3"
        stroke="rgb(239, 68, 68)"
        strokeWidth="1"
      />
      <text
        x="55"
        y="98"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="8"
      >
        Not Tradeable
      </text>
      <rect
        x="110"
        y="85"
        width="70"
        height="20"
        rx="4"
        fill="rgb(239, 68, 68)"
        fillOpacity="0.3"
        stroke="rgb(239, 68, 68)"
        strokeWidth="1"
      />
      <text
        x="145"
        y="98"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="8"
      >
        Not Transferable
      </text>
      <text
        x="100"
        y="115"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="9"
      >
        Smart Contracts
      </text>
    </g>
    <g transform="translate(20, 20)">
      <rect
        x="0"
        y="0"
        width="260"
        height="180"
        rx="8"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.15"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        strokeDasharray="4,4"
        className="dark:fill-blue-400/15 dark:stroke-blue-400"
      />
      <circle
        cx="130"
        cy="60"
        r="40"
        fill="none"
        stroke="rgb(59, 130, 246)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle
        cx="130"
        cy="60"
        r="25"
        fill="none"
        stroke="rgb(59, 130, 246)"
        strokeWidth="1.5"
        opacity="0.6"
      />
      <circle
        cx="110"
        cy="50"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="150"
        cy="50"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="130"
        cy="75"
        r="3"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <text
        x="130"
        y="140"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="10"
        fontWeight="bold"
      >
        Ara Visual Interface
      </text>
      <text
        x="130"
        y="160"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="9"
      >
        Holographic Frontend
      </text>
    </g>
  </svg>
);

// Author Ownership Visualization
export const AuthorOwnershipVisualization: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 400 200"
    className={className}
    aria-label="Author ownership and threshold visualization"
    {...props}
  >
    <g>
      <circle
        cx="80"
        cy="100"
        r="35"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="2"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <text
        x="80"
        y="108"
        textAnchor="middle"
        className="text-lg fill-slate-700 dark:fill-slate-300"
        fontSize="16"
      >
        👤
      </text>
      <text
        x="80"
        y="150"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="11"
        fontWeight="bold"
      >
        Author
      </text>
    </g>
    <path
      d="M 115 100 L 180 100"
      stroke="rgb(168, 85, 247)"
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrow-purple2)"
      className="dark:stroke-purple-400"
    />
    <g>
      <rect
        x="200"
        y="50"
        width="180"
        height="100"
        rx="8"
        fill="rgb(234, 179, 8)"
        fillOpacity="0.15"
        stroke="rgb(234, 179, 8)"
        strokeWidth="2"
        strokeDasharray="3,3"
        className="dark:fill-yellow-400/15 dark:stroke-yellow-400"
      />
      <path
        d="M 290 85 L 290 75 Q 290 70, 295 70 L 305 70 Q 310 70, 310 75 L 310 85 L 315 85 L 315 100 L 285 100 L 285 85 Z"
        fill="rgb(239, 68, 68)"
        className="dark:fill-red-400"
      />
      <circle
        cx="300"
        cy="75"
        r="8"
        fill="none"
        stroke="rgb(239, 68, 68)"
        strokeWidth="2"
        className="dark:stroke-red-400"
      />
      <text
        x="300"
        y="125"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="11"
        fontWeight="bold"
      >
        Locked Star Tokens
      </text>
      <text
        x="300"
        y="140"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="10"
      >
        &lt; 100,000 Threshold
      </text>
    </g>
    <line
      x1="200"
      y1="30"
      x2="380"
      y2="30"
      stroke="rgb(168, 85, 247)"
      strokeWidth="2"
      strokeDasharray="5,5"
      opacity="0.6"
    />
    <text
      x="290"
      y="25"
      textAnchor="middle"
      className="text-xs fill-purple-600 dark:fill-purple-400"
      fontSize="10"
      fontWeight="bold"
    >
      Threshold: 100,000 Stars
    </text>
    <defs>
      <marker
        id="arrow-purple2"
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="rgb(168, 85, 247)"
          className="dark:fill-purple-400"
        />
      </marker>
    </defs>
  </svg>
);

// Ownership Transition SVG
export const OwnershipTransition: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 450 200"
    className={className}
    aria-label="Ownership transition to community"
    {...props}
  >
    <rect
      x="50"
      y="20"
      width="350"
      height="30"
      rx="4"
      fill="rgb(34, 197, 94)"
      fillOpacity="0.2"
      stroke="rgb(34, 197, 94)"
      strokeWidth="2"
      className="dark:fill-green-400/20 dark:stroke-green-400"
    />
    <text
      x="225"
      y="40"
      textAnchor="middle"
      className="text-xs fill-green-700 dark:fill-green-400"
      fontSize="11"
      fontWeight="bold"
    >
      ✓ Threshold Reached: 100,000+ Stars
    </text>
    <path
      d="M 225 60 L 225 80"
      stroke="rgb(34, 197, 94)"
      strokeWidth="3"
      fill="none"
      markerEnd="url(#arrow-green)"
    />
    <g>
      <circle
        cx="120"
        cy="130"
        r="20"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="1.5"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <path
        d="M120 115 L121 125 L131 125 L123 132 L125 140 L120 135 L115 140 L117 132 L109 125 L119 125 Z"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="225"
        cy="130"
        r="20"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="1.5"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <path
        d="M225 115 L226 125 L236 125 L228 132 L230 140 L225 135 L220 140 L222 132 L214 125 L224 125 Z"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <circle
        cx="330"
        cy="130"
        r="20"
        fill="rgb(168, 85, 247)"
        fillOpacity="0.2"
        stroke="rgb(168, 85, 247)"
        strokeWidth="1.5"
        className="dark:fill-purple-400/20 dark:stroke-purple-400"
      />
      <path
        d="M330 115 L331 125 L341 125 L333 132 L335 140 L330 135 L325 140 L327 132 L319 125 L329 125 Z"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <line
        x1="120"
        y1="130"
        x2="225"
        y2="130"
        stroke="rgb(34, 197, 94)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <line
        x1="225"
        y1="130"
        x2="330"
        y2="130"
        stroke="rgb(34, 197, 94)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <text
        x="225"
        y="175"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="11"
        fontWeight="bold"
      >
        Community of Star Holders
      </text>
      <text
        x="225"
        y="190"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="10"
      >
        Aligned with Author's Direction
      </text>
    </g>
    <defs>
      <marker
        id="arrow-green"
        markerWidth="8"
        markerHeight="8"
        refX="7"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 8 3, 0 6"
          fill="rgb(34, 197, 94)"
          className="dark:fill-green-400"
        />
      </marker>
    </defs>
  </svg>
);

// Ara Approach Flow Diagram
export const AraApproachFlow: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 700 250"
    className={className}
    aria-label="Ara approach flow: Funding to Participation, Collaboration, and Responsibility"
    {...props}
  >
    <g>
      <rect
        x="50"
        y="80"
        width="120"
        height="80"
        rx="8"
        fill="rgb(239, 68, 68)"
        fillOpacity="0.2"
        stroke="rgb(239, 68, 68)"
        strokeWidth="2"
        className="dark:fill-red-900/30 dark:stroke-red-400"
      />
      <circle
        cx="110"
        cy="50"
        r="20"
        fill="rgb(239, 68, 68)"
        className="dark:fill-red-400"
      >
        <title>Funding</title>
      </circle>
      <text
        x="110"
        y="57"
        textAnchor="middle"
        className="text-sm fill-white"
        fontSize="14"
        fontWeight="bold"
      >
        $
      </text>
      <text
        x="110"
        y="180"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="12"
        fontWeight="bold"
      >
        Funding
      </text>
    </g>
    <path
      d="M 170 120 L 220 120"
      stroke="rgb(59, 130, 246)"
      strokeWidth="3"
      fill="none"
      markerEnd="url(#arrowhead-blue)"
      className="dark:stroke-blue-400"
    />
    <circle
      cx="220"
      cy="120"
      r="4"
      fill="rgb(59, 130, 246)"
      className="dark:fill-blue-400"
    />
    <path
      d="M 220 120 L 220 60 L 280 60"
      stroke="rgb(59, 130, 246)"
      strokeWidth="2"
      fill="none"
      className="dark:stroke-blue-400"
    />
    <path
      d="M 220 120 L 350 120"
      stroke="rgb(59, 130, 246)"
      strokeWidth="2"
      fill="none"
      className="dark:stroke-blue-400"
    />
    <path
      d="M 220 120 L 220 180 L 280 180"
      stroke="rgb(59, 130, 246)"
      strokeWidth="2"
      fill="none"
      className="dark:stroke-blue-400"
    />
    <g>
      <rect
        x="300"
        y="20"
        width="140"
        height="70"
        rx="8"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.2"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        className="dark:fill-blue-900/30 dark:stroke-blue-400"
      />
      <text
        x="370"
        y="65"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Participation
      </text>
    </g>
    <g>
      <rect
        x="370"
        y="80"
        width="140"
        height="70"
        rx="8"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.2"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        className="dark:fill-blue-900/30 dark:stroke-blue-400"
      />
      <text
        x="440"
        y="125"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Collaboration
      </text>
    </g>
    <g>
      <rect
        x="300"
        y="140"
        width="140"
        height="70"
        rx="8"
        fill="rgb(59, 130, 246)"
        fillOpacity="0.2"
        stroke="rgb(59, 130, 246)"
        strokeWidth="2"
        className="dark:fill-blue-900/30 dark:stroke-blue-400"
      />
      <text
        x="370"
        y="185"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Responsibility
      </text>
    </g>
    <defs>
      <marker
        id="arrowhead-blue"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 10 3, 0 6"
          fill="rgb(59, 130, 246)"
          className="dark:fill-blue-400"
        />
      </marker>
    </defs>
  </svg>
);

// Hyperpay Dependency Tree
export const HyperpayDependencyTree: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    viewBox="0 0 600 350"
    className={className}
    aria-label="Hyperpay dependency tree showing 20% funding routing to dependencies"
    {...props}
  >
    <g>
      <rect
        x="250"
        y="20"
        width="100"
        height="60"
        rx="8"
        fill="rgb(34, 197, 94)"
        fillOpacity="0.3"
        stroke="rgb(34, 197, 94)"
        strokeWidth="2"
        className="dark:fill-green-900/30 dark:stroke-green-400"
      />
      <text
        x="300"
        y="45"
        textAnchor="middle"
        className="text-sm fill-slate-800 dark:fill-slate-200"
        fontSize="14"
        fontWeight="bold"
      >
        Your Project
      </text>
      <text
        x="300"
        y="62"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="12"
      >
        100% Star Tokens
      </text>
    </g>
    <rect
      x="270"
      y="90"
      width="60"
      height="30"
      rx="4"
      fill="rgb(59, 130, 246)"
      fillOpacity="0.2"
      stroke="rgb(59, 130, 246)"
      strokeWidth="2"
      className="dark:fill-blue-900/30 dark:stroke-blue-400"
    />
    <text
      x="300"
      y="110"
      textAnchor="middle"
      className="text-xs fill-slate-700 dark:fill-slate-300"
      fontSize="11"
      fontWeight="bold"
    >
      Funding
    </text>
    <path
      d="M 300 120 L 300 160"
      stroke="rgb(34, 197, 94)"
      strokeWidth="2"
      fill="none"
      markerEnd="url(#arrowhead-green)"
      className="dark:stroke-green-400"
    />
    <text
      x="320"
      y="145"
      className="text-xs fill-green-600 dark:fill-green-400"
      fontSize="12"
      fontWeight="bold"
    >
      20%
    </text>
    <g>
      <rect
        x="50"
        y="180"
        width="100"
        height="60"
        rx="8"
        fill="rgb(34, 197, 94)"
        fillOpacity="0.2"
        stroke="rgb(34, 197, 94)"
        strokeWidth="2"
        strokeDasharray="4,4"
        className="dark:fill-green-900/20 dark:stroke-green-400"
      />
      <text
        x="100"
        y="205"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Dependency 1
      </text>
      <circle
        cx="100"
        cy="225"
        r="8"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <path
        d="M100 217 L102 224 L109 224 L103 229 L105 236 L100 231 L95 236 L97 229 L91 224 L98 224 Z"
        fill="white"
      />
    </g>
    <g>
      <rect
        x="250"
        y="180"
        width="100"
        height="60"
        rx="8"
        fill="rgb(34, 197, 94)"
        fillOpacity="0.2"
        stroke="rgb(34, 197, 94)"
        strokeWidth="2"
        strokeDasharray="4,4"
        className="dark:fill-green-900/20 dark:stroke-green-400"
      />
      <text
        x="300"
        y="205"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Dependency 2
      </text>
      <circle
        cx="300"
        cy="225"
        r="8"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <path
        d="M300 217 L302 224 L309 224 L303 229 L305 236 L300 231 L295 236 L297 229 L291 224 L298 224 Z"
        fill="white"
      />
    </g>
    <g>
      <rect
        x="450"
        y="180"
        width="100"
        height="60"
        rx="8"
        fill="rgb(34, 197, 94)"
        fillOpacity="0.2"
        stroke="rgb(34, 197, 94)"
        strokeWidth="2"
        strokeDasharray="4,4"
        className="dark:fill-green-900/20 dark:stroke-green-400"
      />
      <text
        x="500"
        y="205"
        textAnchor="middle"
        className="text-sm fill-slate-700 dark:fill-slate-300"
        fontSize="13"
        fontWeight="bold"
      >
        Dependency 3
      </text>
      <circle
        cx="500"
        cy="225"
        r="8"
        fill="rgb(234, 179, 8)"
        className="dark:fill-yellow-400"
      />
      <path
        d="M500 217 L502 224 L509 224 L503 229 L505 236 L500 231 L495 236 L497 229 L491 224 L498 224 Z"
        fill="white"
      />
    </g>
    <path
      d="M 300 160 L 100 180"
      stroke="rgb(34, 197, 94)"
      strokeWidth="2"
      strokeOpacity="0.5"
      fill="none"
      className="dark:stroke-green-400"
    />
    <path
      d="M 300 160 L 300 180"
      stroke="rgb(34, 197, 94)"
      strokeWidth="2"
      strokeOpacity="0.5"
      fill="none"
      className="dark:stroke-green-400"
    />
    <path
      d="M 300 160 L 500 180"
      stroke="rgb(34, 197, 94)"
      strokeWidth="2"
      strokeOpacity="0.5"
      fill="none"
      className="dark:stroke-green-400"
    />
    <g>
      <rect
        x="50"
        y="280"
        width="500"
        height="60"
        rx="8"
        fill="rgb(249, 250, 251)"
        fillOpacity="0.5"
        stroke="rgb(203, 213, 225)"
        strokeWidth="1"
        className="dark:fill-slate-800/50 dark:stroke-slate-600"
      />
      <text
        x="300"
        y="300"
        textAnchor="middle"
        className="text-xs fill-slate-700 dark:fill-slate-300"
        fontSize="12"
        fontWeight="bold"
      >
        Maintainers earn Stars in dependencies
      </text>
      <text
        x="300"
        y="320"
        textAnchor="middle"
        className="text-xs fill-slate-600 dark:fill-slate-400"
        fontSize="11"
      >
        Stay aligned with teams • Protect functions • Long-term stakeholders
      </text>
    </g>
    <defs>
      <marker
        id="arrowhead-green"
        markerWidth="10"
        markerHeight="10"
        refX="9"
        refY="3"
        orient="auto"
      >
        <polygon
          points="0 0, 10 3, 0 6"
          fill="rgb(34, 197, 94)"
          className="dark:fill-green-400"
        />
      </marker>
    </defs>
  </svg>
);

// Social Media Icons
export const TelegramIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.559z" />
  </svg>
);

export const DiscordIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
  </svg>
);

export const GitHubIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const LinkedInIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const TwitterIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const BlueskyIcon: React.FC<SVGProps> = ({ className = '', ...props }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    {...props}
  >
    <path d="M12 10.8c-1.087-.488-2.13-1.01-3.23-1.547a.5.5 0 0 0-.74.44v9.1a.5.5 0 0 0 .22.41l3.62 2.47a.5.5 0 0 0 .66-.08l3.69-3.12a.5.5 0 0 0 .19-.4v-6.47a.5.5 0 0 0-.4-.49c-1.3-.2-2.6-.4-3.84-.69zm-1.5-8.55c-1.198.54-2.44 1.1-3.7 1.69a.5.5 0 0 0-.3.46v4.2a.5.5 0 0 0 .22.41l2.5 1.7a.5.5 0 0 0 .56.02l4.3-2.5a.5.5 0 0 0 .22-.41V4.5a.5.5 0 0 0-.3-.46c-1.26-.59-2.5-1.15-3.7-1.69z" />
  </svg>
);
