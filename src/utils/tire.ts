export function getMinDepth(depthReview: any) {
  const res = Math.min(
    depthReview.average_depth_external,
    depthReview.average_depth_internal,
    depthReview.average_depth_middle,
  );

  return Number.isNaN(res) ? 0 : res;
}
