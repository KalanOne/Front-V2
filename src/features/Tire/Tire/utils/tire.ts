export function getMinDepth(depthReview: any) {
  const res = Math.min(
    depthReview.average_depth_external,
    depthReview.average_depth_internal,
    depthReview.average_depth_middle,
  );

  return Number.isNaN(res) ? 0 : res;
}

export function getHelmetValue(tire: any) {
  if (tire.cycle.tire_condition_id.includes("ORIGINAL")) {
    return tire.cycle.variation.helmet_value_original.toString();
  }

  return tire.cycle.variation.helmet_value_revitalized.toString();
}
