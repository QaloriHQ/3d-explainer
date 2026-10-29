import { Easing, spring } from "remotion";
import type { ActionBlock } from "./schema";
export function progress(block: ActionBlock, frame: number, fps: number) {
  const local = frame - block.startFrame;
  if (local < 0) return 0;
  if (local >= block.durationFrames - 1) return 1;
  if (block.easing === "spring")
    return spring({
      frame: local,
      fps,
      durationInFrames: block.durationFrames,
      config: { damping: 200 },
    });
  const t = local / (block.durationFrames - 1);
  return block.easing === "linear" ? t : Easing.inOut(Easing.cubic)(t);
}
export function valueAt(
  blocks: ActionBlock[],
  kind: ActionBlock["kind"],
  frame: number,
  fps: number,
) {
  let value = 0;
  for (const block of blocks
    .filter((b) => b.kind === kind)
    .sort((a, b) => a.startFrame - b.startFrame)) {
    if (frame < block.startFrame) break;
    value = value + (block.target - value) * progress(block, frame, fps);
  }
  return value;
}
