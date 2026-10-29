import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { valueAt } from "@/lib/timeline/evaluate";
import type { TimelineState } from "@/lib/timeline/schema";
function Assembly({
  timeline,
  componentId,
}: {
  timeline: TimelineState;
  componentId: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const blocks = timeline.blocks.filter((b) => b.componentId === componentId);
  const rotate = (valueAt(blocks, "rotate", frame, fps) * Math.PI) / 180;
  const explode = valueAt(blocks, "explode", frame, fps);
  const highlight = valueAt(blocks, "highlight", frame, fps);
  return (
    <group rotation={[0, rotate, Math.PI / 2]}>
      <mesh>
        <cylinderGeometry args={[0.65, 0.65, 2.4, 48]} />
        <meshStandardMaterial
          color="#c9d6e5"
          emissive="#1173d4"
          emissiveIntensity={highlight}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <mesh key={side} position={[0, side * (1.1 + explode), 0]}>
          <torusGeometry args={[0.69, 0.17, 16, 48]} />
          <meshStandardMaterial
            color="#1173d4"
            metalness={0.35}
            roughness={0.3}
          />
        </mesh>
      ))}
    </group>
  );
}
export function Explainer({ timeline }: { timeline: TimelineState }) {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ background: "#101b2b" }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [4, 3, 6], fov: 38 }}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[4, 5, 4]} intensity={3} />
        {timeline.components.map((c) => (
          <Sequence
            key={c.id}
            layout="none"
            durationInFrames={timeline.durationFrames}
          >
            <Assembly timeline={timeline} componentId={c.id} />
          </Sequence>
        ))}
      </ThreeCanvas>
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 40,
          fontFamily: "Arial",
          color: "#d9e7f8",
          fontSize: 20,
          letterSpacing: 3,
        }}
      >
        TXKPRO / MECHANICAL EXPLAINERS
      </div>
      <div
        style={{
          position: "absolute",
          left: 48,
          bottom: 40,
          fontFamily: "Arial",
          color: "#8ba4c3",
          fontSize: 18,
        }}
      >
        PVC coupling · procedural placeholder
      </div>
    </AbsoluteFill>
  );
}
