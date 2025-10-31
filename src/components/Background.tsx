export default function Background() {
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
          backgroundImage: `url("/assets/img/noise.jpg")`,
          backgroundSize: '600px 600px',
          backgroundPosition: '0 0',
          backgroundRepeat: 'repeat',
          opacity: 0.15,
          mixBlendMode: 'soft-light',
          transform: 'scale(1.5)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Secondary layer - finer detail with different blend mode
          backgroundImage: `url("/assets/img/noise.jpg")`,
          backgroundSize: '200px 200px',
          backgroundPosition: '100px 100px',
          backgroundRepeat: 'repeat',
          opacity: 0.12,
          mixBlendMode: 'overlay',
          transform: 'scale(1.2) rotate(1deg)',
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          // Fine top layer - organic texture
          backgroundImage: `url("/assets/img/noise.jpg")`,
          backgroundSize: '100px 100px',
          backgroundPosition: '50px 25px',
          backgroundRepeat: 'repeat',
          opacity: 0.08,
          mixBlendMode: 'multiply',
          transform: 'scale(1.8) rotate(-0.5deg)',
        }}
      />
    </>
  );
}