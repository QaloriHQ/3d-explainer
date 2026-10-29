"use client";
import { Player } from "@remotion/player";
import { Explainer } from "@/remotion/Explainer";
import type { TimelineState } from "@/lib/timeline/schema";
export default function Preview({ timeline }: { timeline: TimelineState }) {
  return (
    <Player
      component={Explainer}
      inputProps={{ timeline }}
      durationInFrames={timeline.durationFrames}
      compositionWidth={timeline.width}
      compositionHeight={timeline.height}
      fps={timeline.fps}
      controls
      style={{ width: "100%", borderRadius: 12, overflow: "hidden" }}
      errorFallback={({ error }) => (
        <div role="alert">
          3D preview unavailable: {error.message}. A WebGL-capable browser is
          required.
        </div>
      )}
    />
  );
}
