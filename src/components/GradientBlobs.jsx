export default function GradientBlobs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden -z-10">
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 md:w-96 md:h-96 bg-accent/30 rounded-full blur-3xl animate-blob" />
      <div className="absolute top-[20%] right-[-8%] w-72 h-72 md:w-96 md:h-96 bg-coral/30 rounded-full blur-3xl animate-blob [animation-delay:4s]" />
      <div className="absolute bottom-[-10%] left-[30%] w-72 h-72 md:w-96 md:h-96 bg-accent-light/20 rounded-full blur-3xl animate-blob [animation-delay:8s]" />
    </div>
  );
}
