// ✅ 文件: utils/formatDate.ts
export const formatDate = (timestamp: number): string => {
  return new Date(timestamp).toLocaleString("zh-CN", {
    hour12: false,
    dateStyle: "short",
    timeStyle: "short",
  });
};