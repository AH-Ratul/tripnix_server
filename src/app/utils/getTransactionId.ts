export const getTransactionId = () => {
  return `TNX-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
};