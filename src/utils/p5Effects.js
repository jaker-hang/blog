/**
 * 手动触发「弱点爆发」全屏特效（在 love 页会被全局层忽略）
 */
export function triggerP5WeakHit() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("p5-weak-hit"));
}
