/*!
 * FIND_ISS v1.0.0
 * Copyright (c) 2023 Buddhika Thanura
 * MIT Licensed
 */

/**
 * @summary Yesterday date is required to get the news articles from NEWS API.
 * */

export const gettingDate = function () {
  const today = new Date();
  const ddDaybefore = today.getDate() - 1;
  const mm = today.getMonth() + 1;
  const yy = today.getFullYear();
  const date = `${yy}-${mm}-${ddDaybefore}`;
  return date;
};
