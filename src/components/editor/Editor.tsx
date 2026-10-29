"use client";
import dynamic from "next/dynamic";
import { useTimeline } from "@/stores/timeline";
import { actionKind, type ActionKind } from "@/lib/timeline/schema";
const Preview = dynamic(() => import("./Preview"), {
  ssr: false,
  loading: () => <p>Loading 3D preview…</p>,
});
const names = {
  rotate: "Rotate",
  highlight: "Highlight",
  explode: "Exploded View",
};
export default function Editor() {
  const { timeline, selectedId, select, add, update, remove, error } =
    useTimeline();
  const selected = timeline.blocks.find((b) => b.id === selectedId);
  return (
    <main style={{ maxWidth: 1600, margin: "auto", padding: 32 }}>
      <header className="flex justify-between items-center mb-8">
        <div>
          <small>TXKPRO · 3D EXPLAINER ENGINE</small>
          <h1 className="text-2xl font-semibold mt-2">
            Build understanding, block by block.
          </h1>
        </div>
        <span className="text-xs text-slate-400">LOCAL PREVIEW · 60 FPS</span>
      </header>
      <div className="workspace">
        <aside>
          <h2>Action library</h2>
          <p className="text-sm text-slate-400 my-4">
            Drag an action onto a track, or click to append.
          </p>
          {actionKind.options.map((kind) => (
            <button
              className="block w-full mb-3 text-left"
              key={kind}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", kind)}
              onClick={() => add(kind, timeline.components[0].id)}
            >
              {names[kind]} <span aria-hidden>＋</span>
            </button>
          ))}
          <small>State driven actions. No manual keyframes.</small>
        </aside>
        <section aria-label="Video preview">
          <Preview timeline={timeline} />
          <div className="mt-5 mb-3 flex justify-between">
            <h2>Timeline</h2>
            <small>10 seconds / 60 fps</small>
          </div>
          {timeline.components.map((c) => (
            <div
              className="track"
              key={c.id}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const kind = e.dataTransfer.getData("text/plain");
                if (actionKind.safeParse(kind).success)
                  add(kind as ActionKind, c.id);
              }}
            >
              <small>{c.name}</small>
              <div>
                {timeline.blocks
                  .filter((b) => b.componentId === c.id)
                  .map((b) => (
                    <button
                      key={b.id}
                      className={
                        "block " + (b.id === selectedId ? "selected" : "")
                      }
                      aria-pressed={b.id === selectedId}
                      onClick={() => select(b.id)}
                    >
                      {names[b.kind]}
                      <br />
                      <small>
                        {(b.startFrame / 60).toFixed(1)}s →{" "}
                        {((b.startFrame + b.durationFrames) / 60).toFixed(1)}s
                      </small>
                    </button>
                  ))}
              </div>
            </div>
          ))}
          {error && (
            <p role="alert" className="text-amber-300 mt-3">
              {error}
            </p>
          )}
        </section>
        <aside>
          <h2>Inspector</h2>
          {selected ? (
            <>
              <p className="mt-5">{names[selected.kind]}</p>
              <label title="Length of this action in seconds">
                Duration · {(selected.durationFrames / 60).toFixed(1)}s
                <input
                  aria-label="Duration seconds"
                  type="range"
                  min={0.1}
                  max={10}
                  step={0.1}
                  value={selected.durationFrames / 60}
                  onChange={(e) =>
                    update(selected.id, {
                      durationFrames: Math.round(+e.target.value * 60),
                    })
                  }
                />
              </label>
              <label>
                Easing
                <select
                  value={selected.easing}
                  onChange={(e) =>
                    update(selected.id, {
                      easing: e.target.value as typeof selected.easing,
                    })
                  }
                >
                  <option value="linear">Linear</option>
                  <option value="spring">Spring</option>
                  <option value="ease-in-out">Ease-in-out</option>
                </select>
              </label>
              <label>
                Target · {selected.target}
                {selected.kind === "rotate"
                  ? "°"
                  : selected.kind === "explode"
                    ? " units"
                    : " intensity"}
                <input
                  aria-label="Target value"
                  type="range"
                  min={selected.kind === "rotate" ? -360 : 0}
                  max={
                    selected.kind === "rotate"
                      ? 360
                      : selected.kind === "explode"
                        ? 2
                        : 1
                  }
                  step={selected.kind === "rotate" ? 1 : 0.05}
                  value={selected.target}
                  onChange={(e) =>
                    update(selected.id, { target: +e.target.value })
                  }
                />
              </label>
              <button onClick={() => remove(selected.id)}>Remove block</button>
            </>
          ) : (
            <p className="text-sm mt-5">
              Select an action to edit its parameters.
            </p>
          )}
          <p className="text-xs text-slate-400 mt-8">
            Cloud export will be enabled after the authenticated Lambda pipeline
            is connected.
          </p>
        </aside>
      </div>
    </main>
  );
}
