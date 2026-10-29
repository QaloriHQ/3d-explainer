import test from "node:test";
import assert from "node:assert/strict";
import { initialTimeline, timelineSchema } from "../src/lib/timeline/schema";
import { valueAt } from "../src/lib/timeline/evaluate";
import {
  validateUpload,
  MAX_UPLOAD_BYTES,
} from "../src/lib/assets/validate-upload";
test("JSON roundtrip and timeline bounds", () => {
  assert.deepEqual(
    timelineSchema.parse(JSON.parse(JSON.stringify(initialTimeline))),
    initialTimeline,
  );
  assert.equal(
    timelineSchema.safeParse({
      ...initialTimeline,
      blocks: [{ ...initialTimeline.blocks[0], startFrame: 590 }],
    }).success,
    false,
  );
});
test("animation is seek-independent and holds final target", () => {
  const blocks = initialTimeline.blocks;
  assert.equal(valueAt(blocks, "rotate", 0, 60), 0);
  assert.equal(valueAt(blocks, "rotate", 599, 60), 90);
  const midpoint = valueAt(blocks, "rotate", 90, 60);
  valueAt(blocks, "rotate", 0, 60);
  assert.equal(valueAt(blocks, "rotate", 90, 60), midpoint);
});
test("overlap and bad references rejected", () => {
  assert.equal(
    timelineSchema.safeParse({
      ...initialTimeline,
      blocks: [
        ...initialTimeline.blocks,
        { ...initialTimeline.blocks[0], id: "other" },
      ],
    }).success,
    false,
  );
  assert.equal(
    timelineSchema.safeParse({
      ...initialTimeline,
      blocks: [{ ...initialTimeline.blocks[0], componentId: "foreign" }],
    }).success,
    false,
  );
});
test("upload boundaries", () => {
  assert.equal(
    validateUpload({ name: "pipe.glb", size: MAX_UPLOAD_BYTES }),
    true,
  );
  assert.throws(() =>
    validateUpload({ name: "pipe.glb", size: MAX_UPLOAD_BYTES + 1 }),
  );
  assert.throws(() => validateUpload({ name: "pipe.exe", size: 4 }));
});
