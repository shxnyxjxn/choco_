import React from 'react';

interface SceneProps {
  pageNumber: number;
}

export const SceneIllustration: React.FC<SceneProps> = ({ pageNumber }) => {
  switch (pageNumber) {
    case 1:
      return <Scene1GardenClue />;
    case 2:
      return <Scene2SniffGrass />;
    case 3:
      return <Scene3TallTreeBird />;
    case 4:
      return <Scene4BirdChirps />;
    case 5:
      return <Scene5WoodenBenchFootprint />;
    case 6:
      return <Scene6RedGardenShed />;
    case 7:
      return <Scene7RabbitWithBasket />;
    case 8:
      return <Scene8RabbitNods />;
    case 9:
      return <Scene9WagsTailShare />;
    case 10:
      return <Scene10BestFriendsSolved />;
    default:
      return <Scene1GardenClue />;
  }
};

// Reusable Detective Puppy (Choco) Head & Body parts
const ChocoPuppy = ({
  x = 180,
  y = 120,
  scale = 1,
  sniffing = false,
  wagging = false,
  lookingUp = false
}: {
  x?: number;
  y?: number;
  scale?: number;
  sniffing?: boolean;
  wagging?: boolean;
  lookingUp?: boolean;
}) => (
  <g transform={`translate(${x}, ${y}) scale(${scale})`}>
    {/* Tail - Root firmly anchored to body, only tip wags back and forth */}
    <g>
      {/* Tail root anchor under the body */}
      <ellipse cx="25" cy="94" rx="7" ry="9" fill="#A16207" stroke="#78350F" strokeWidth="2" />
      {wagging ? (
        <path
          fill="#A16207"
          stroke="#78350F"
          strokeWidth="3"
          strokeLinejoin="round"
        >
          <animate
            attributeName="d"
            dur="0.55s"
            repeatCount="indefinite"
            values="
              M 26 96 Q 2 82 5 62 Q 14 58 20 78 Q 23 88 26 96 Z;
              M 26 96 Q -6 86 -4 66 Q 8 60 18 78 Q 23 88 26 96 Z;
              M 26 96 Q 2 82 5 62 Q 14 58 20 78 Q 23 88 26 96 Z;
              M 26 96 Q 10 76 13 52 Q 22 52 22 76 Q 23 88 26 96 Z;
              M 26 96 Q 2 82 5 62 Q 14 58 20 78 Q 23 88 26 96 Z
            "
            keyTimes="0; 0.25; 0.5; 0.75; 1"
          />
        </path>
      ) : (
        <path
          d="M 26 96 Q 2 82 5 62 Q 14 58 20 78 Q 23 88 26 96 Z"
          fill="#A16207"
          stroke="#78350F"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </g>

    {/* Body */}
    <ellipse cx="65" cy="105" rx="42" ry="32" fill="#D97706" stroke="#78350F" strokeWidth="3" />
    <ellipse cx="65" cy="110" rx="26" ry="20" fill="#FDE68A" />

    {/* Legs */}
    <rect x="38" y="125" width="14" height="25" rx="7" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
    <rect x="78" y="125" width="14" height="25" rx="7" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />

    {/* Detective Collar */}
    <path d="M 50 82 Q 70 95 90 82" stroke="#EF4444" strokeWidth="6" strokeLinecap="round" />
    <circle cx="70" cy="92" r="5" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />

    {/* Head Group */}
    <g transform={`translate(${lookingUp ? -2 : 0}, ${sniffing ? 15 : lookingUp ? -12 : 0})`}>
      {/* Ears */}
      <ellipse cx="40" cy="50" rx="14" ry="26" transform="rotate(-25 40 50)" fill="#92400E" stroke="#78350F" strokeWidth="3" />
      <ellipse cx="102" cy="50" rx="14" ry="26" transform="rotate(25 102 50)" fill="#92400E" stroke="#78350F" strokeWidth="3" />

      {/* Head circle */}
      <circle cx="71" cy="56" r="34" fill="#F59E0B" stroke="#78350F" strokeWidth="3" />
      {/* Muzzle */}
      <ellipse cx="71" cy="68" rx="20" ry="15" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
      {/* Nose */}
      <ellipse cx="71" cy="62" rx="7" ry="5" fill="#1E293B" />
      <ellipse cx="69" cy="60" rx="2" ry="1.5" fill="#FFFFFF" />

      {/* Mouth */}
      {sniffing ? (
        <path d="M 66 73 Q 71 77 76 73" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 64 71 Q 71 80 78 71" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      )}

      {/* Eyes */}
      <circle cx="58" cy="48" r="6" fill="#1E293B" />
      <circle cx="56" cy="46" r="2" fill="#FFFFFF" />
      <circle cx="84" cy="48" r="6" fill="#1E293B" />
      <circle cx="82" cy="46" r="2" fill="#FFFFFF" />

      {/* Cheeks */}
      <circle cx="48" cy="62" r="5" fill="#FCA5A5" opacity="0.6" />
      <circle cx="94" cy="62" r="5" fill="#FCA5A5" opacity="0.6" />

      {/* Detective Hat (Tweed/Brown houndstooth style) */}
      <path
        d="M 40 32 C 40 10, 102 10, 102 32 Z"
        fill="#78350F"
        stroke="#451A03"
        strokeWidth="2.5"
      />
      <ellipse cx="71" cy="33" rx="38" ry="8" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
      <rect x="52" y="27" width="38" height="6" fill="#F59E0B" rx="2" />
    </g>
  </g>
);

// 1. Garden Clue
const Scene1GardenClue = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <defs>
      <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="70%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#FEF08A" />
      </linearGradient>
      <linearGradient id="grassGrad1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#86EFAC" />
        <stop offset="100%" stopColor="#22C55E" />
      </linearGradient>
    </defs>
    {/* Background Sky & Hills */}
    <rect width="500" height="300" fill="url(#skyGrad1)" />
    <circle cx="430" cy="55" r="32" fill="#FDE047" opacity="0.9" />

    {/* Background Hills */}
    <path d="M 0 170 Q 140 120 280 160 T 500 150 L 500 300 L 0 300 Z" fill="#BBF7D0" />
    <path d="M 0 185 Q 180 165 350 195 T 500 190 L 500 300 L 0 300 Z" fill="url(#grassGrad1)" />

    {/* Garden Flowers */}
    <g transform="translate(40, 210)">
      <circle cx="10" cy="10" r="8" fill="#F43F5E" />
      <circle cx="10" cy="10" r="4" fill="#FEF08A" />
      <path d="M 10 18 L 10 40" stroke="#15803D" strokeWidth="3" />
    </g>
    <g transform="translate(90, 225)">
      <circle cx="10" cy="10" r="7" fill="#A855F7" />
      <circle cx="10" cy="10" r="3" fill="#FEF08A" />
      <path d="M 10 17 L 10 38" stroke="#15803D" strokeWidth="3" />
    </g>
    <g transform="translate(420, 215)">
      <circle cx="10" cy="10" r="9" fill="#FB923C" />
      <circle cx="10" cy="10" r="4" fill="#FEF08A" />
      <path d="M 10 19 L 10 42" stroke="#15803D" strokeWidth="3" />
    </g>

    {/* Detective Choco */}
    <ChocoPuppy x={110} y={105} scale={1.15} />

    {/* Magnifying Glass held by Choco */}
    <g transform="translate(245, 175) rotate(-20)">
      <circle cx="30" cy="30" r="26" fill="rgba(255,255,255,0.4)" stroke="#475569" strokeWidth="4" />
      <rect x="52" y="30" width="30" height="8" rx="4" fill="#92400E" stroke="#475569" strokeWidth="2" />
      {/* Glare line */}
      <path d="M 15 22 A 18 18 0 0 1 35 15" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>

    {/* The Clue! (Golden Paw Sparkle) */}
    <g transform="translate(320, 195)">
      <circle cx="30" cy="30" r="32" fill="#FEF08A" opacity="0.6" className="animate-pulse" />
      {/* Golden paw print */}
      <circle cx="30" cy="32" r="10" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="21" cy="18" r="4.5" fill="#EAB308" />
      <circle cx="30" cy="14" r="5" fill="#EAB308" />
      <circle cx="39" cy="18" r="4.5" fill="#EAB308" />
      {/* Sparkles */}
      <path d="M 50 15 L 53 22 L 60 25 L 53 28 L 50 35 L 47 28 L 40 25 L 47 22 Z" fill="#F59E0B" />
      <path d="M 10 40 L 12 45 L 17 47 L 12 49 L 10 54 L 8 49 L 3 47 L 8 45 Z" fill="#F59E0B" />
    </g>

    {/* Badge/Clue Callout */}
    <rect x="290" y="145" width="105" height="30" rx="15" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="2" />
    <text x="342" y="165" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#B45309" fontFamily="Fredoka, sans-serif">
      🔍 Little Clue!
    </text>
  </svg>
);

// 2. Sniff Grass
const Scene2SniffGrass = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#DCFCE7" />
    <path d="M 0 160 Q 250 130 500 160 L 500 300 L 0 300 Z" fill="#86EFAC" />
    <path d="M 0 185 Q 250 170 500 185 L 500 300 L 0 300 Z" fill="#4ADE80" />

    {/* Grass blades detailed */}
    {[60, 90, 140, 200, 240, 290, 340, 390, 440].map((gx, idx) => (
      <path
        key={idx}
        d={`M ${gx} 240 Q ${gx - 8} 210 ${gx - 12} 190 Q ${gx} 215 ${gx + 4} 240`}
        fill="#15803D"
      />
    ))}

    {/* Sniffing Waves (~) */}
    <g transform="translate(300, 195)" stroke="#64748B" strokeWidth="3" fill="none" strokeLinecap="round">
      <path d="M 0 0 Q 15 -10 30 0 T 60 0" strokeDasharray="4 4" className="animate-pulse" />
      <path d="M 10 16 Q 25 6 40 16 T 70 16" strokeDasharray="4 4" className="animate-pulse" />
    </g>

    {/* Choco leaning down sniffing */}
    <ChocoPuppy x={140} y={115} scale={1.2} sniffing={true} />

    {/* Thought Bubble with Question Bone */}
    <g transform="translate(320, 45)">
      <circle cx="20" cy="55" r="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="34" cy="42" r="10" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
      <rect x="35" y="0" width="110" height="58" rx="20" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
      {/* Golden Bone outline */}
      <g transform="translate(55, 15)">
        <path
          d="M 12 10 C 6 2, 0 10, 8 16 C 0 22, 6 30, 12 22 L 48 22 C 54 30, 60 22, 52 16 C 60 10, 54 2, 48 10 Z"
          fill="#FDE047"
          stroke="#D97706"
          strokeWidth="2"
        />
        <text x="68" y="24" fontSize="20" fill="#D97706" fontWeight="bold">?</text>
      </g>
    </g>
  </svg>
);

// 3. Tall Tree with Yellow Bird
const Scene3TallTreeBird = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#E0F2FE" />
    <circle cx="80" cy="60" r="35" fill="#FEF08A" opacity="0.8" />
    <path d="M 0 230 Q 250 210 500 230 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* The TALL Tree */}
    <g transform="translate(310, 20)">
      {/* Tree Trunk */}
      <path d="M 50 120 L 40 240 L 80 240 L 70 120 Z" fill="#78350F" stroke="#451A03" strokeWidth="3" />
      {/* Tall foliage layers */}
      <ellipse cx="60" cy="110" rx="75" ry="65" fill="#15803D" />
      <ellipse cx="60" cy="70" rx="65" ry="55" fill="#16A34A" />
      <ellipse cx="60" cy="30" rx="50" ry="40" fill="#22C55E" />
      {/* Branch */}
      <path d="M 50 145 Q 15 140 -20 155" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />

      {/* Little Yellow Bird sitting on branch */}
      <g transform="translate(-25, 115)">
        {/* Bird Body */}
        <ellipse cx="20" cy="22" rx="14" ry="12" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
        <ellipse cx="28" cy="16" rx="9" ry="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
        {/* Wing */}
        <ellipse cx="14" cy="24" rx="9" ry="6" transform="rotate(-15 14 24)" fill="#EAB308" />
        {/* Beak */}
        <polygon points="37,16 45,18 37,22" fill="#EA580C" />
        {/* Eye */}
        <circle cx="31" cy="14" r="2.5" fill="#0F172A" />
        {/* Tail */}
        <polygon points="6,24 -2,22 4,28" fill="#CA8A04" />
      </g>
    </g>

    {/* Detective Choco looking up at the tall tree */}
    <ChocoPuppy x={90} y={115} scale={1.1} lookingUp={true} />

    {/* Height arrow indicating "TALL" */}
    <g transform="translate(450, 40)">
      <line x1="15" y1="20" x2="15" y2="200" stroke="#0284C7" strokeWidth="3" strokeDasharray="6 4" />
      <polygon points="15,10 9,25 21,25" fill="#0284C7" />
      <polygon points="15,210 9,195 21,195" fill="#0284C7" />
      <rect x="-8" y="95" width="46" height="26" rx="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
      <text x="15" y="112" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#0369A1">TALL</text>
    </g>
  </svg>
);

// 4. Bird Chirps Happily
const Scene4BirdChirps = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#FEF3C7" />
    <path d="M 0 220 Q 250 200 500 220 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Friendly Tree Branch */}
    <path d="M 500 130 Q 380 120 280 150" stroke="#78350F" strokeWidth="12" strokeLinecap="round" />
    <ellipse cx="440" cy="100" rx="70" ry="50" fill="#22C55E" opacity="0.8" />

    {/* Yellow Bird singing loudly & happily */}
    <g transform="translate(260, 90)">
      <ellipse cx="30" cy="35" rx="22" ry="18" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
      <ellipse cx="45" cy="24" rx="14" ry="13" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
      {/* Open Singing Beak */}
      <polygon points="58,20 72,16 60,25" fill="#EA580C" />
      <polygon points="60,27 70,32 58,31" fill="#EA580C" />
      {/* Happy closed arched eye */}
      <path d="M 45 20 Q 49 16 53 20" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Flapping Wing */}
      <ellipse cx="20" cy="35" rx="15" ry="10" transform="rotate(-30 20 35)" fill="#EAB308" />

      {/* Musical Notes Floating (Chirp!) */}
      <g fill="#D97706">
        <text x="75" y="15" fontSize="22" className="animate-bounce">♪</text>
        <text x="95" y="-2" fontSize="28" className="animate-bounce">♫</text>
        <text x="120" y="25" fontSize="20" className="animate-bounce">♪</text>
      </g>
    </g>

    {/* Choco talking to the bird */}
    <ChocoPuppy x={70} y={115} scale={1.15} lookingUp={true} wagging={true} />

    {/* Speech Bubble */}
    <rect x="180" y="25" width="130" height="40" rx="18" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
    <path d="M 230 65 L 240 80 L 245 65 Z" fill="#FFFFFF" stroke="#D97706" strokeWidth="2" />
    <rect x="231" y="63" width="13" height="4" fill="#FFFFFF" />
    <text x="245" y="49" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#92400E" fontFamily="Fredoka, sans-serif">
      "Chirp chirp! 🎶"
    </text>
  </svg>
);

// 5. Wooden Bench with Footprint
const Scene5WoodenBenchFootprint = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#FEF9C3" />
    <path d="M 0 210 Q 250 190 500 210 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* The Wooden Bench */}
    <g transform="translate(180, 80)">
      {/* Bench Backrest slats */}
      <rect x="20" y="20" width="180" height="14" rx="4" fill="#92400E" stroke="#5B21B6" strokeWidth="0" />
      <rect x="20" y="40" width="180" height="14" rx="4" fill="#B45309" />
      <rect x="20" y="60" width="180" height="14" rx="4" fill="#92400E" />
      {/* Seat slat */}
      <rect x="10" y="80" width="200" height="18" rx="5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
      {/* Bench Legs */}
      <rect x="35" y="98" width="12" height="70" fill="#451A03" rx="3" />
      <rect x="175" y="98" width="12" height="70" fill="#451A03" rx="3" />
      {/* Support braces */}
      <line x1="41" y1="120" x2="181" y2="120" stroke="#78350F" strokeWidth="4" />
    </g>

    {/* Mud Patch Under Bench with Footprints */}
    <ellipse cx="280" cy="235" rx="90" ry="30" fill="#78350F" opacity="0.3" />

    {/* Animal Footprints (Rabbit paws leading right) */}
    {[
      { x: 230, y: 230, s: 0.8 },
      { x: 275, y: 225, s: 0.9 },
      { x: 325, y: 235, s: 1.0 },
      { x: 380, y: 220, s: 1.1 }
    ].map((fp, idx) => (
      <g key={idx} transform={`translate(${fp.x}, ${fp.y}) scale(${fp.s})`}>
        {/* Main pad */}
        <ellipse cx="12" cy="12" rx="7" ry="9" fill="#451A03" />
        {/* Toe prints */}
        <circle cx="5" cy="1" r="3" fill="#451A03" />
        <circle cx="12" cy="-2" r="3.2" fill="#451A03" />
        <circle cx="19" cy="1" r="3" fill="#451A03" />
      </g>
    ))}

    {/* Choco looking under the bench with detective badge */}
    <ChocoPuppy x={30} y={110} scale={1.15} sniffing={true} />

    {/* Magnifier on the footprint */}
    <circle cx="335" cy="235" r="28" fill="rgba(255,255,255,0.3)" stroke="#F59E0B" strokeWidth="3" className="animate-pulse" />
  </svg>
);

// 6. Red Garden Shed
const Scene6RedGardenShed = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#FFE4E6" />
    <path d="M 0 200 Q 250 185 500 200 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Stone path to the shed */}
    <path d="M 80 280 Q 200 240 320 220 L 370 220 Q 230 250 140 300 Z" fill="#CBD5E1" />

    {/* The RED Garden Shed */}
    <g transform="translate(290, 50)">
      {/* Roof */}
      <polygon points="85,15 -10,75 180,75" fill="#475569" stroke="#1E293B" strokeWidth="3" />
      {/* Wall (Red wood) */}
      <rect x="5" y="75" width="160" height="140" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
      {/* Wood plank vertical lines */}
      <line x1="35" y1="75" x2="35" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="65" y1="75" x2="65" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="105" y1="75" x2="105" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="135" y1="75" x2="135" y2="215" stroke="#991B1B" strokeWidth="1.5" />

      {/* Door */}
      <rect x="55" y="105" width="60" height="110" rx="4" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2.5" />
      {/* Door cross-beams */}
      <line x1="55" y1="105" x2="115" y2="215" stroke="#7F1D1D" strokeWidth="2" />
      <line x1="55" y1="215" x2="115" y2="105" stroke="#7F1D1D" strokeWidth="2" />
      {/* Door handle */}
      <circle cx="65" cy="160" r="4" fill="#FBBF24" />

      {/* Little Window with flower box */}
      <rect x="125" y="115" width="30" height="30" rx="3" fill="#BAE6FD" stroke="#FFFFFF" strokeWidth="2" />
      <rect x="122" y="145" width="36" height="10" rx="2" fill="#78350F" />
      <circle cx="130" cy="143" r="4" fill="#FB7185" />
      <circle cx="140" cy="143" r="4" fill="#FBBF24" />
      <circle cx="150" cy="143" r="4" fill="#FB7185" />
    </g>

    {/* Choco walking slowly to the shed */}
    <ChocoPuppy x={80} y={115} scale={1.15} />

    {/* Direction footsteps */}
    <circle cx="210" cy="245" r="5" fill="#B45309" opacity="0.6" />
    <circle cx="240" cy="235" r="5" fill="#B45309" opacity="0.6" />
    <circle cx="270" cy="225" r="5" fill="#B45309" opacity="0.6" />
  </svg>
);

// 7. Gray Rabbit with Basket Hops Out from Shed
const Scene7RabbitWithBasket = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <defs>
      <linearGradient id="gardenSky7" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EDE9FE" />
        <stop offset="60%" stopColor="#FAE8FF" />
        <stop offset="100%" stopColor="#FEF08A" />
      </linearGradient>
    </defs>
    <rect width="500" height="300" fill="url(#gardenSky7)" />
    <path d="M 0 210 Q 250 195 500 210 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Stone path leading out from the shed door towards Choco */}
    <path d="M 400 215 Q 270 215 110 240 L 140 280 Q 290 245 450 235 Z" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1" />
    <ellipse cx="330" cy="225" rx="14" ry="5" fill="#E2E8F0" />
    <ellipse cx="270" cy="230" rx="16" ry="6" fill="#E2E8F0" />
    <ellipse cx="210" cy="238" rx="15" ry="5" fill="#E2E8F0" />

    {/* The Red Garden Shed on the Right */}
    <g transform="translate(325, 45)">
      {/* Roof */}
      <polygon points="90,15 -10,70 185,70" fill="#475569" stroke="#1E293B" strokeWidth="2.5" />
      {/* Red Wooden Wall */}
      <rect x="5" y="70" width="165" height="145" fill="#DC2626" stroke="#991B1B" strokeWidth="2.5" />
      <line x1="35" y1="70" x2="35" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="65" y1="70" x2="65" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="105" y1="70" x2="105" y2="215" stroke="#991B1B" strokeWidth="1.5" />
      <line x1="135" y1="70" x2="135" y2="215" stroke="#991B1B" strokeWidth="1.5" />

      {/* Open Dark Doorway */}
      <rect x="35" y="90" width="70" height="125" rx="4" fill="#29150F" stroke="#1C1917" strokeWidth="2" />

      {/* Inside Shed Hints (tools shelf) */}
      <line x1="42" y1="120" x2="98" y2="120" stroke="#78350F" strokeWidth="3" />
      <rect x="50" y="105" width="16" height="15" fill="#F59E0B" rx="2" />
      <rect x="72" y="102" width="12" height="18" fill="#10B981" rx="2" />

      {/* Door swung wide open */}
      <polygon points="105,90 148,102 148,212 105,215" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
      <circle cx="140" cy="155" r="3.5" fill="#FBBF24" />
    </g>

    {/* Hop Motion Trajectory Arcs on the ground */}
    <g stroke="#9333EA" strokeWidth="2.5" strokeDasharray="5 4" fill="none" opacity="0.6">
      {/* Arc 1: from shed doorway (370) to mid-way landing (270) */}
      <path d="M 370 215 Q 320 150 270 220" />
      {/* Arc 2: from mid-way landing (270) to front of Choco (170) */}
      <path d="M 270 220 Q 220 150 170 225" />
    </g>

    {/* Dust Puffs at landing spots */}
    <g fill="#E9D5FF" opacity="0.7">
      <ellipse cx="270" cy="226" rx="14" ry="5" />
      <circle cx="265" cy="224" r="5" />
      <circle cx="276" cy="224" r="4" />
      <ellipse cx="170" cy="228" rx="15" ry="6" />
      <circle cx="164" cy="226" r="6" />
      <circle cx="176" cy="226" r="5" />
    </g>

    {/* Detective Choco on Left - watching the rabbit hop out with surprise */}
    <ChocoPuppy x={25} y={115} scale={1.12} wagging={true} />

    {/* "Hop! Hop!" Animated Callout Badge */}
    <g transform="translate(190, 40)">
      <rect x="0" y="0" width="105" height="30" rx="15" fill="#FFFFFF" stroke="#9333EA" strokeWidth="2" shadow-md="true" />
      <text x="52" y="20" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#7E22CE" fontFamily="Fredoka, sans-serif">
        🐇 Hop! Hop!
      </text>
    </g>

    {/* Cute Gray Rabbit Hopping Out from Shed Doorway towards Choco */}
    <g className="animate-rabbit-hop">
      <animateTransform
        attributeName="transform"
        type="translate"
        values="
          370,110;
          315,55;
          265,110;
          260,114;
          215,50;
          165,105;
          165,105;
          370,110
        "
        keyTimes="0; 0.16; 0.32; 0.40; 0.56; 0.72; 0.90; 1"
        dur="3.4s"
        repeatCount="indefinite"
      />

      {/* Rabbit Group - Facing Left towards Detective Choco */}
      <g transform="scale(1.15)">
        {/* Hop Stretch & Squash Animation */}
        <animateTransform
          attributeName="transform"
          type="scale"
          values="
            1.12 1.12;
            1.05 1.25;
            1.22 1.02;
            1.15 1.15;
            1.05 1.25;
            1.20 1.05;
            1.15 1.15;
            1.12 1.12
          "
          keyTimes="0; 0.16; 0.32; 0.40; 0.56; 0.72; 0.90; 1"
          dur="3.4s"
          repeatCount="indefinite"
        />

        {/* Fluffy Rabbit Tail (on right side) */}
        <circle cx="68" cy="84" r="9" fill="#F8FAFC" stroke="#475569" strokeWidth="1.5" />

        {/* Fluffy Gray Rabbit Body */}
        <ellipse cx="45" cy="82" rx="25" ry="21" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        <ellipse cx="43" cy="85" rx="16" ry="14" fill="#F1F5F9" />

        {/* Back Legs (Paws stretched back while leaping) */}
        <ellipse cx="60" cy="98" rx="10" ry="6" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <ellipse cx="40" cy="99" rx="10" ry="6" fill="#94A3B8" stroke="#475569" strokeWidth="2" />

        {/* Long Gray Ears with Pink Centers (angled back during hop) */}
        <ellipse cx="36" cy="22" rx="7" ry="26" transform="rotate(18 36 22)" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        <ellipse cx="36" cy="22" rx="4" ry="18" transform="rotate(18 36 22)" fill="#F472B6" />

        <ellipse cx="20" cy="24" rx="7" ry="26" transform="rotate(5 20 24)" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        <ellipse cx="20" cy="24" rx="4" ry="18" transform="rotate(5 20 24)" fill="#F472B6" />

        {/* Head facing Left */}
        <circle cx="28" cy="50" r="21" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
        {/* Cheeks */}
        <ellipse cx="24" cy="56" rx="13" ry="9" fill="#F1F5F9" />
        <circle cx="34" cy="56" r="3.5" fill="#F472B6" opacity="0.6" />
        <circle cx="16" cy="56" r="3.5" fill="#F472B6" opacity="0.6" />

        {/* Eyes looking forward-left at Choco */}
        <circle cx="20" cy="46" r="3.5" fill="#1E293B" />
        <circle cx="19" cy="45" r="1.2" fill="#FFFFFF" />
        <circle cx="32" cy="46" r="3.5" fill="#1E293B" />
        <circle cx="31" cy="45" r="1.2" fill="#FFFFFF" />

        {/* Nose & Smiling Mouth */}
        <polygon points="22,54 19,51 25,51" fill="#EC4899" />
        <path d="M 19 57 Q 22 61 25 57" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* The Woven Basket Held out Front (towards Choco) */}
        <g transform="translate(-10, 64)">
          <path d="M 5 8 Q 16 -6 27 8" stroke="#78350F" strokeWidth="2.5" fill="none" />
          <rect x="0" y="8" width="32" height="22" rx="4" fill="#D97706" stroke="#92400E" strokeWidth="2" />
          <line x1="0" y1="15" x2="32" y2="15" stroke="#92400E" strokeWidth="1.5" />
          <line x1="11" y1="8" x2="11" y2="30" stroke="#92400E" strokeWidth="1.5" />
          <line x1="21" y1="8" x2="21" y2="30" stroke="#92400E" strokeWidth="1.5" />
        </g>
      </g>
    </g>
  </svg>
);

// 8. Rabbit Nods with Golden Bone in Basket
const Scene8RabbitNods = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#CCFBF1" />
    <path d="M 0 215 Q 250 200 500 215 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Choco on Left asking */}
    <ChocoPuppy x={60} y={115} scale={1.1} />

    {/* Question above Choco */}
    <rect x="75" y="45" width="130" height="36" rx="18" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
    <text x="140" y="68" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0F766E">My golden bone? 🦴</text>

    {/* Rabbit on Right with Basket & Golden Bone */}
    <g transform="translate(280, 85) scale(1.15)">
      {/* Rabbit Body (grounded & connected) */}
      <ellipse cx="50" cy="85" rx="24" ry="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <ellipse cx="50" cy="88" rx="16" ry="14" fill="#F1F5F9" />

      {/* Neck base connecting body and head */}
      <path d="M 38 52 Q 49 64 60 52 L 58 70 Q 49 76 40 70 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1" />

      {/* Nod Motion Indicator Arrow next to head */}
      <g transform="translate(14, 25)">
        <path d="M 0 0 Q -8 14 0 28" stroke="#0D9488" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="3 3" />
        <polygon points="1,32 -5,25 4,25" fill="#0D9488" />
      </g>

      {/* Head nodding animation group - natural pivot at neck (49, 62) */}
      <g style={{ transformOrigin: '49px 62px' }} className="animate-nod">
        <animateTransform
          attributeName="transform"
          type="rotate"
          values="0 49 62; 15 49 62; 0 49 62; 12 49 62; 0 49 62"
          dur="1.6s"
          repeatCount="indefinite"
          keyTimes="0; 0.25; 0.5; 0.75; 1"
        />

        {/* Ears */}
        <ellipse cx="40" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <ellipse cx="40" cy="20" rx="4" ry="18" fill="#F472B6" />
        <ellipse cx="58" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
        <ellipse cx="58" cy="20" rx="4" ry="18" fill="#F472B6" />

        {/* Head */}
        <circle cx="49" cy="46" r="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />

        {/* Cheerful Smiling & Nodding Expression */}
        <path d="M 40 45 Q 44 40 48 45" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M 52 45 Q 56 40 60 45" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <polygon points="49,50 46,47 52,47" fill="#EC4899" />
        <path d="M 46 54 Q 49 58 52 54" stroke="#475569" strokeWidth="2" fill="none" strokeLinecap="round" />
        <circle cx="39" cy="52" r="3.5" fill="#F472B6" opacity="0.6" />
        <circle cx="59" cy="52" r="3.5" fill="#F472B6" opacity="0.6" />
      </g>

      {/* Basket with Shiny Golden Bone */}
      <g transform="translate(0, 75)">
        <rect x="0" y="10" width="46" height="28" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="2" />
        {/* THE GOLDEN BONE Gleaming */}
        <g transform="translate(6, -2)">
          <path
            d="M 6 6 C 2 0, -2 6, 4 10 C -2 14, 2 20, 6 14 L 28 14 C 32 20, 36 14, 30 10 C 36 6, 32 0, 28 6 Z"
            fill="#FACC15"
            stroke="#CA8A04"
            strokeWidth="2"
          />
          {/* Sparkles around bone */}
          <polygon points="16,-8 18,-3 23,-2 18,-1 16,4 14,-1 9,-2 14,-3" fill="#F59E0B" />
        </g>
      </g>
    </g>

    {/* Nodding badge */}
    <rect x="330" y="25" width="110" height="32" rx="16" fill="#FFFFFF" stroke="#0D9488" strokeWidth="2" />
    <text x="385" y="46" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#0D9488">Nods "Yes!" 😊</text>
  </svg>
);

// 9. Choco Wags Tail and Shares Bone
const Scene9WagsTailShare = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <rect width="500" height="300" fill="#FEF3C7" />
    <path d="M 0 210 Q 250 195 500 210 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Picnic Blanket */}
    <polygon points="150,225 350,225 380,265 120,265" fill="#EF4444" opacity="0.8" />
    <polygon points="160,230 340,230 365,260 135,260" fill="#FFFFFF" opacity="0.3" />

    {/* Golden Bone shared right in the middle */}
    <g transform="translate(225, 230)">
      <path
        d="M 10 10 C 4 2, -2 10, 6 16 C -2 22, 4 30, 10 22 L 40 22 C 46 30, 52 22, 44 16 C 52 10, 46 2, 40 10 Z"
        fill="#FACC15"
        stroke="#B45309"
        strokeWidth="2.5"
      />
      {/* Sparkles */}
      <polygon points="25,2 27,6 31,7 27,8 25,12 23,8 19,7 23,6" fill="#F59E0B" />
    </g>

    {/* Choco on Left - WAGGING TAIL vigorously! */}
    <ChocoPuppy x={80} y={115} scale={1.15} wagging={true} />

    {/* Tail wag motion lines */}
    <g transform="translate(60, 160)" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M 0 0 Q 15 -10 20 -25" />
      <path d="M -8 10 Q 5 -5 12 -20" />
      <path d="M -16 20 Q -5 0 2 -15" />
    </g>

    {/* Rabbit on Right smiling and sharing */}
    <g transform="translate(340, 105) scale(1.15)">
      <ellipse cx="40" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <ellipse cx="58" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <circle cx="49" cy="46" r="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <circle cx="43" cy="45" r="3" fill="#1E293B" />
      <circle cx="55" cy="45" r="3" fill="#1E293B" />
      <polygon points="49,49 46,46 52,46" fill="#EC4899" />
      <path d="M 46 53 Q 49 57 52 53" stroke="#475569" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="85" rx="24" ry="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      {/* Rabbit holding carrot */}
      <polygon points="25,75 10,95 20,95" fill="#F97316" />
      <path d="M 23,73 L 26,68 M 25,75 L 29,71" stroke="#22C55E" strokeWidth="2" />
    </g>

    {/* Top heart */}
    <g transform="translate(240, 60)">
      <path
        d="M 15 8 A 6 6 0 0 0 3 8 C 3 14 15 22 15 22 C 15 22 27 14 27 8 A 6 6 0 0 0 15 8 Z"
        fill="#EF4444"
        className="animate-pulse"
      />
    </g>
  </svg>
);

// 10. Best Friends Now! Mystery Solved!
const Scene10BestFriendsSolved = () => (
  <svg viewBox="0 0 500 300" className="w-full h-full object-cover">
    <defs>
      <linearGradient id="partyGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FEF08A" />
        <stop offset="50%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#FED7AA" />
      </linearGradient>
    </defs>
    <rect width="500" height="300" fill="url(#partyGrad)" />
    <path d="M 0 215 Q 250 205 500 215 L 500 300 L 0 300 Z" fill="#86EFAC" />

    {/* Confetti & Stars */}
    {[
      { x: 50, y: 40, c: "#EF4444", r: 4 },
      { x: 120, y: 70, c: "#3B82F6", r: 5 },
      { x: 180, y: 35, c: "#10B981", r: 6 },
      { x: 260, y: 55, c: "#F59E0B", r: 5 },
      { x: 330, y: 30, c: "#8B5CF6", r: 4 },
      { x: 410, y: 65, c: "#EC4899", r: 6 },
      { x: 450, y: 35, c: "#EAB308", r: 5 },
    ].map((item, idx) => (
      <circle key={idx} cx={item.x} cy={item.y} r={item.r} fill={item.c} />
    ))}

    {/* Bunting Garland at top */}
    <path d="M 0 30 Q 125 60 250 30 Q 375 60 500 30" stroke="#CBD5E1" strokeWidth="2" fill="none" />
    {[
      { x: 50, y: 40, c: "#EF4444" },
      { x: 110, y: 45, c: "#3B82F6" },
      { x: 170, y: 42, c: "#10B981" },
      { x: 230, y: 36, c: "#F59E0B" },
      { x: 290, y: 38, c: "#8B5CF6" },
      { x: 350, y: 44, c: "#EC4899" },
      { x: 410, y: 45, c: "#06B6D4" }
    ].map((tri, i) => (
      <polygon key={i} points={`${tri.x},${tri.y} ${tri.x + 16},${tri.y + 24} ${tri.x + 32},${tri.y}`} fill={tri.c} />
    ))}

    {/* "MYSTERY SOLVED!" Banner */}
    <g transform="translate(140, 70)">
      <rect x="0" y="0" width="220" height="42" rx="21" fill="#FFFFFF" stroke="#F59E0B" strokeWidth="3" />
      <text x="110" y="27" textAnchor="middle" fontSize="17" fontWeight="bold" fill="#B45309" fontFamily="Fredoka, sans-serif">
        ⭐ MYSTERY SOLVED! ⭐
      </text>
    </g>

    {/* Detective Choco & Rabbit celebrating together */}
    <g transform="translate(100, 105)">
      <ChocoPuppy x={0} y={0} scale={1.1} wagging={true} />
    </g>

    {/* Rabbit next to Choco wearing a mini detective ribbon */}
    <g transform="translate(290, 100) scale(1.15)">
      <ellipse cx="40" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <ellipse cx="58" cy="20" rx="7" ry="26" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <circle cx="49" cy="46" r="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <circle cx="43" cy="44" r="3" fill="#1E293B" />
      <circle cx="55" cy="44" r="3" fill="#1E293B" />
      <polygon points="49,49 46,46 52,46" fill="#EC4899" />
      <path d="M 46 53 Q 49 57 52 53" stroke="#475569" strokeWidth="2" fill="none" />
      <ellipse cx="50" cy="85" rx="24" ry="20" fill="#94A3B8" stroke="#475569" strokeWidth="2" />

      {/* Detective Star Badge on rabbit */}
      <polygon points="49,70 51,75 56,76 52,80 54,85 49,82 44,85 46,80 42,76 47,75" fill="#FACC15" stroke="#B45309" strokeWidth="1" />
    </g>

    {/* Golden Bone Held Joyfully */}
    <g transform="translate(225, 175) rotate(-15)">
      <path
        d="M 8 8 C 2 0, -4 8, 4 14 C -4 20, 2 28, 8 20 L 42 20 C 48 28, 54 20, 46 14 C 54 8, 48 0, 42 8 Z"
        fill="#FACC15"
        stroke="#78350F"
        strokeWidth="2.5"
      />
    </g>
  </svg>
);
