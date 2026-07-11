import { generateNoisePattern } from '@/lib/imageUtils';

export default function Background() {
  // Use optimized 200px seamless tile for all layers (much smaller: 23KB vs 9.75MB)
  const noiseTile = generateNoisePattern(200);

  return (
    <>
      {/* Background gradient (base layer) */}
      <div className="fixed inset-0 -z-20 pointer-events-none" />

      {/* Static background blobs */}
      <div className="fixed inset-0 -z-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-500/5 rounded-full blur-xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/5 rounded-full blur-xl" />
      </div>

      {/* Multi-layered brilliant noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Base layer - larger seamless pattern
          backgroundImage: noiseTile,
          backgroundSize: '200px 200px',
          backgroundPosition: '0 0',
          backgroundRepeat: 'repeat',
          opacity: 0.15,
          mixBlendMode: 'soft-light',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Secondary layer - finer detail with different blend mode
          backgroundImage: noiseTile,
          backgroundSize: '200px 200px',
          backgroundPosition: '100px 100px',
          backgroundRepeat: 'repeat',
          opacity: 0.12,
          mixBlendMode: 'overlay',
          transform: 'rotate(1deg)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Fine top layer - organic texture
          backgroundImage: noiseTile,
          backgroundSize: '200px 200px',
          backgroundPosition: '50px 25px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
          mixBlendMode: 'multiply',
          transform: 'rotate(-0.5deg)',
        }}
      />
    </>
  );
}