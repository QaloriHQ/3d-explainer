import { z } from "zod";
export const actionKind = z.enum(["rotate", "highlight", "explode"]);
export const easing = z.enum(["linear", "spring", "ease-in-out"]);
export const blockSchema = z
  .object({
    id: z.string().min(1),
    componentId: z.string().min(1),
    kind: actionKind,
    startFrame: z.number().int().nonnegative(),
    durationFrames: z.number().int().min(2),
    easing,
    target: z.number().finite(),
  })
  .strict();
export const timelineSchema = z
  .object({
    schemaVersion: z.literal(1),
    fps: z.literal(60),
    width: z.literal(1280),
    height: z.literal(720),
    durationFrames: z.number().int().min(2).max(36000),
    components: z
      .array(
        z
          .object({
            id: z.string().min(1),
            name: z.string(),
            asset: z.literal("placeholder-pipe"),
          })
          .strict(),
      )
      .min(1),
    blocks: z.array(blockSchema),
  })
  .strict()
  .superRefine((t, ctx) => {
    const ids = t.components.map((c) => c.id);
    if (
      new Set(ids).size !== ids.length ||
      new Set(t.blocks.map((b) => b.id)).size !== t.blocks.length
    )
      ctx.addIssue({ code: "custom", message: "IDs must be unique" });
    for (const b of t.blocks) {
      if (
        !ids.includes(b.componentId) ||
        b.startFrame + b.durationFrames > t.durationFrames
      )
        ctx.addIssue({
          code: "custom",
          message: "Invalid component or block outside timeline",
        });
      const bounds =
        b.kind === "rotate"
          ? [-360, 360]
          : b.kind === "highlight"
            ? [0, 1]
            : [0, 2];
      if (b.target < bounds[0] || b.target > bounds[1])
        ctx.addIssue({
          code: "custom",
          message: "Target outside action bounds",
        });
      if (
        t.blocks.some(
          (o) =>
            o.id !== b.id &&
            o.componentId === b.componentId &&
            o.kind === b.kind &&
            o.startFrame < b.startFrame + b.durationFrames &&
            b.startFrame < o.startFrame + o.durationFrames,
        )
      )
        ctx.addIssue({
          code: "custom",
          message: "Same-action blocks may not overlap",
        });
    }
  });
export type TimelineState = z.infer<typeof timelineSchema>;
export type ActionBlock = z.infer<typeof blockSchema>;
export type ActionKind = z.infer<typeof actionKind>;
export const initialTimeline: TimelineState = {
  schemaVersion: 1,
  fps: 60,
  width: 1280,
  height: 720,
  durationFrames: 600,
  components: [
    { id: "pipe", name: "PVC coupling assembly", asset: "placeholder-pipe" },
  ],
  blocks: [
    {
      id: "demo-rotate",
      componentId: "pipe",
      kind: "rotate",
      startFrame: 0,
      durationFrames: 180,
      easing: "ease-in-out",
      target: 90,
    },
  ],
};
