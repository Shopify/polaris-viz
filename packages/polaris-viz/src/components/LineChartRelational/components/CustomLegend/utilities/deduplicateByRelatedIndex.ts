export const deduplicateByRelatedIndex = (data: any[]) => {
  const existingRelatedIndex = new Set();
  return data.filter((item) => {
    const relatedIndex = item.metadata?.relatedIndex;
    if (!relatedIndex) return true;
    if (existingRelatedIndex.has(relatedIndex)) return false;
    existingRelatedIndex.add(relatedIndex);
    return true;
  });
};
