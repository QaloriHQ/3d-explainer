import { create } from "zustand";
import {
  initialTimeline,
  timelineSchema,
  type TimelineState,
  type ActionBlock,
  type ActionKind,
} from "@/lib/timeline/schema";
type Store = {
  timeline: TimelineState;
  selectedId: string | null;
  error: string | null;
  select: (id: string) => void;
  add: (kind: ActionKind, componentId: string) => void;
  update: (
    id: string,
    patch: Partial<Pick<ActionBlock, "durationFrames" | "easing" | "target">>,
  ) => void;
  remove: (id: string) => void;
};
export const useTimeline = create<Store>((set) => ({
  timeline: structuredClone(initialTimeline),
  selectedId: "demo-rotate",
  error: null,
  select: (selectedId) => set({ selectedId }),
  add: (kind, componentId) =>
    set((s) => {
      const startFrame = s.timeline.blocks
        .filter((b) => b.componentId === componentId)
        .reduce((n, b) => Math.max(n, b.startFrame + b.durationFrames), 0);
      const block: ActionBlock = {
        id: crypto.randomUUID(),
        componentId,
        kind,
        startFrame,
        durationFrames: 120,
        easing: "ease-in-out",
        target: kind === "rotate" ? 90 : 1,
      };
      const result = timelineSchema.safeParse({
        ...s.timeline,
        blocks: [...s.timeline.blocks, block],
      });
      return result.success
        ? { timeline: result.data, selectedId: block.id, error: null }
        : { error: "The 10-second track is full. Remove or shorten a block." };
    }),
  update: (id, patch) =>
    set((s) => {
      const result = timelineSchema.safeParse({
        ...s.timeline,
        blocks: s.timeline.blocks.map((b) =>
          b.id === id ? { ...b, ...patch } : b,
        ),
      });
      return result.success
        ? { timeline: result.data, error: null }
        : { error: result.error.issues[0].message };
    }),
  remove: (id) =>
    set((s) => ({
      timeline: {
        ...s.timeline,
        blocks: s.timeline.blocks.filter((b) => b.id !== id),
      },
      selectedId: null,
      error: null,
    })),
}));
